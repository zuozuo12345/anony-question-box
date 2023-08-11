
const fs = require('fs');
const express = require('express');
const { ApolloServer, UserInputError } = require('apollo-server-express');
const { GraphQLScalarType } = require('graphql');
const { Kind } = require('graphql/language');
const { MongoClient } = require('mongodb');
const { ObjectId } = require('mongodb').ObjectId;
const { sha256 } = require('js-sha256');
const axios = require('axios');
const { v4: uuidv4 } = require('uuid');

//const url = 'mongodb://mongo:27017/anon';
const url = 'mongodb://localhost:27017/anon';
const DAY = 24 * 60 * 60 * 1000;
const WEEK = 7 * DAY;




let db;

let aboutMessage = "Anonymous Question Box API v1.0";


const sha256RegExp = /^(?=.*[A-Z])(?=.*\d).{6,}$/;
// const sha256RegExp = /^[a-f0-9]{64}$/gi;
const nameRegExp = /^[a-zA-Z0-9]+$/;
const objectIdRegExp = /^[0-9a-f]{24}$/i;

const resolvers = {
  Query: {
    getQuestions,
    getAnswers,
    search,
    getGroupInfo,
    getUserInfo,
    getQuestionDetail,
    getQuestionsByGuest
  },
  Mutation: {
    signUp,
    logIn,
    createQuestion,
    createAnswer,
    deleteQuestion,
    createGroup,
    editGroupMember,
    editGroupAdmin,
    deleteGroup,
    updateGroupInfo,
    updateUserInfo
  },
};

async function signUp(_, { input }) {
  const name = input.name.trim();
  const nickname = input.nickname.trim();
  const password = input.password;
  const userId = uuidv4();
  const result = { successful: false, remark: "" };
  if (name === "") {
    result.remark = "ERR_NAME: The name should not be empty.";
  } else if (!nameRegExp.test(name)) {
    result.remark = "ERR_NAME: The name should only contain alphabets and numbers.";
  } else if (nickname === "") {
    result.remark = "ERR_NICKNAME: The nickname should not be empty.";
  } else if (!sha256RegExp.test(password)) {
    result.remark = "ERR_PASSWORD: The password hash is invalid.";
  } else {
    const findResult = await db.collection("users").find({ name: name }).toArray();
    if (findResult.length > 0) {
      return { successful: false, remark: "The name already exists." };
    }
    const insertResult = await db.collection("users").insertOne({
      name: name,
      nickname: nickname,
      password: password,
      userId: userId,
      valid: true
    });
    const findAgain = await db.collection("users").find({ name: name }).toArray();
    if (findAgain.length > 0) {
      var tokenDoc = await createOrGetToken(name);
      const retryMax = 5;
      var i = 0;
      while (!tokenDoc) {
        if (i >= retryMax) {
          result.remark = "ERR_DB: Sorry that our server is not responding. Please try again."
          return result;
        }
        i += 1;
        tokenDoc = await createOrGetToken(name);
      }
      result.successful = true;
      result.token = tokenDoc.token;
      result.expiration = tokenDoc.expiration;
      result.userId = userId;
    } else {
      result.remark = "ERR_DB: Error in creating the users, please try again.";
    }
  }
  return result;
}

async function createOrGetToken(name) {
  const fetchToken = await db.collection("tokens").findOne({ name: name });
  const now = new Date();
  const expiration = new Date(now.getTime() + WEEK);
  if (!fetchToken) {
    const rawString = name + now.toISOString() + Math.floor(Math.random() * 256);
    const token = sha256.update(rawString).toString();
    db.collection("tokens").insertOne({
      name: name,
      token: token,
      expiration: expiration
    });
  } else if (fetchToken.expiration.getTime() <= now.getTime() + DAY) {
    const rawString = name + now.toISOString() + Math.floor(Math.random() * 256);
    // const token = sha256.update(rawString).toString();
    db.collection("tokens").updateOne({
      name: name
    }, {
      name: name,
      token: fetchToken.token,
      expiration: expiration
    });
  }
  const newToken = await db.collection("tokens").findOne({
    name: name
  });
  return newToken;
}

function removeExpiredTokens() {
  const now = new Date();
  db.collection("tokens").deleteMany({
    "expiration": { "$lte": now }
  });
  setTimeout(removeExpiredTokens, DAY);
}

async function logIn(_, { input }) {
  const name = input.name.trim();
  const nickname = input.nickname.trim();
  const password = input.password;
  const result = {
    successful: false,
    remark: ""
  };
  const findResult = await db.collection("users").findOne({ name: name });
  if (!findResult) {
    result.remark = "ERR_NAME: Didn't find user " + name + ". Please try again.";
    return result;
  }
  if (password === result.password) {
    result.remark = "ERR_PASSWORD: The password is incorrect. Please try again.";
    return result;
  }
  var tokenDoc = await createOrGetToken(name);
  const retryMax = 5;
  var i = 0;
  while (!tokenDoc) {
    if (i >= retryMax) {
      result.remark = "ERR_DB: Sorry that our server is not responding. Please try again."
      return result;
    }
    i += 1;
    tokenDoc = await createOrGetToken(name);
  }
  result.successful = true;
  result.token = tokenDoc.token;
  result.expiration = tokenDoc.expiration;
  result.userId = findResult.userId;
  return result;
}

async function validateToken(name, token) {
  if (!nameRegExp.test(name)) {
    console.log("why name?")
    return false;
  }
  const now = new Date();
  const fetched = await db.collection("tokens").findOne({ name: name, token: token });
  console.log(name)
  if (fetched && fetched.expiration.getTime() >= now.getTime()) {
    return true;
  } else {
    console.log("maybe token")
    return false;
  }
}








async function createQuestion(_, { input }) {
  const hostname = input.hostname;
  // const groupname = input.groupname;
  const guestname = input.guestname.trim();
  const content = input.content.trim();
  const token = input.token;
  const result = {
    successful: false,
    questionId: "",
    remark: ""
  }
  const loggedIn = await validateToken(guestname, token);
  if (!loggedIn) {
    result.remark = "ERR_TOKEN: User is not logged in.";
    return result;
  }
  if (content === "") {
    result.remark = "ERR_CONTENT: Content cannot be empty.";
    return result;
  }
  if (await profanityCheck(content)) {
    result.remark = "ERR_PROFANE: This question is rejected due to possible profanity.";
    return result;
  }
  if (hostname) {
    if (hostname === guestname) {
      result.remark = "ERR_NAME: Cannot ask question to yourself.";
      return result;
    }
    const insertResult = await db.collection("questions").insertOne({
      hostname: hostname,
      guestname: guestname,
      content: content,
      timestamp: new Date(),
      answers: []
    });
    if (insertResult.insertedCount === 1) {
      result.questionId = insertResult.insertedId.toString();
      result.successful = true;
      return result;
    } else {
      result.remark = "ERR_DB: Database failure, please try again.";
      return result;
    }
  } else if (groupname) {
    const group = await getGroupByName(groupname);
    if (!group) {
      result.remark = "ERR_GROUP: Group doesn't exist.";
      return result;
    }
    if (!group.memberNames.find(element => element === guestname)) {
      result.remark = "ERR_NAME: The guest is not in this grouop.";
      return result;
    }
    const insertResult = await db.collection("questions").insertOne({
      groupname: groupname,
      guestname: guestname,
      content: content,
      timestamp: new Date(),
      answers: []
    });
    if (insertResult.insertedCount === 1) {
      result.successful = true;
      result.questionId = insertResult.insertedId.toString();
      return result;
    } else {
      result.remark = "ERR_DB: Please try again.";
      return result;
    }
  } else {
    result.remark = "ERR_NAME: You need to specify either a host name or a group name.";
    return result;
  }
}

async function createAnswer(_, { input }) {
  const idString = input.questionId;
  const content = input.content.trim();
  const guestname = input.guestname.trim();
  const token = input.token;
  const result = {
    successful: false,
    questionId: "",
    remark: ""
  };
  if (!objectIdRegExp.test(idString)) {
    result.remark = "ERR_ID: The question id is not valid.";
    return result;
  }
  const questionId = ObjectId(idString);
  const valid = await validateToken(guestname, token);
  if (!valid) {
    result.remark = "ERR_TOKEN: Session expired, please log in again."
    return result;
  }
  const profanity = await profanityCheck(content);
  if (profanity) {
    result.remark = "ERR_PROFANE: This answer is rejected due to possible profanity.";
    return result;
  }
  const questionResult = await db.collection("questions").findOne({ "_id": questionId });
  if (questionResult === null) {
    result.remark = "ERR_QUESTION: Question no longer exists.";
    return result;
  }
  const isHost = questionResult.hostname && guestname === questionResult.hostname;
  const timestamp = new Date();
  const insertResult = await db.collection("answers").insertOne({
    content: content,
    isHost: isHost,
    questionId: questionId,
    timestamp: timestamp
  });
  if (insertResult.insertedCount != 1) {
    result.remark = "ERR_DB: Database failure, please try again.";
    return result;
  }
  const answerId = ObjectId(insertResult.insertedId);
  const appendResult = await db.collection("questions").updateOne({ _id: questionId }, {
    "$push": { answers: { $ref: "answers", $id: answerId } }
  });
  if (appendResult.modifiedCount != 1) {
    db.collection("answers").deleteOne({ "_id": answerId });
    result.remark = "ERR_DB: Database failure, please try again.";
    return result;
  } else {
    result.successful = true;
    result.answerId = answerId;
    return result;
  }
}

function digest(x) {
  console.log(x);
  return {
    questionId: x._id,
    content: x.content,
    timestamp: x.timestamp,
    hostname: x.hostname,
    guestname: x.guestname
  };
}

async function getQuestions(_, { input }) {
  const hostname = input.hostname;
  // const groupname = input.groupname;
  const limit = input.limit ? input.limit : 20;
  const offset = input.offset ? input.offset : 0;
  var questions = []
  if (hostname) {
    questions = await db.collection("questions")
      .find({ hostname: hostname }).sort({ "timestamp": 1 })
      .skip(offset).limit(limit).toArray();
  }
  // else if (groupname) {
  //   questions = await db.collection("questions")
  //     .find({ groupname: groupname }).sort({ "timestamp": 1 })
  //     .skip(offset).limit(limit).toArray();
  // }
  return questions.map(digest);
}

async function getAnswers(_, { input }) {
  const idString = input.questionId;
  const limit = input.limit ? input.limit : 20;
  const offset = input.offset ? input.offset : 0;
  const validId = objectIdRegExp.test(idString);
  if (!validId) {
    return [];
  }
  const questionId = ObjectId(idString);
  const question = await db.collection("questions").findOne({ _id: questionId });
  if (!question) {
    return [];
  }
  const answerIds = question.answers.map(x => ObjectId(x.oid));
  return await db.collection("answers").find({ _id: { $in: answerIds } })
    .skip(offset).limit(limit).toArray();
}

async function deleteQuestion(_, { input }) {
  const idString = input.questionId;
  const name = input.name.trim();
  const token = input.token;
  const result = {
    successful: false,
    remark: ""
  };
  if (!objectIdRegExp.test(idString)) {
    result.remark = "ERR_ID: The question id is not valid.";
    return result;
  }
  const questionId = ObjectId(idString);
  const loggedIn = await validateToken(name, token);
  if (!loggedIn) {
    result.remark = "ERR_TOKEN: The user is not logged in.";
    return result;
  }
  const isAdmin = await isAdminUser(name);
  const question = await db.collection("questions").findOne({ _id: questionId });
  if (!question) {
    result.remark = "ERR_QUESTION_NOT_FOUND: The question doesn't exist.";
    return result;
  }
  if (question.hostname !== name && question.guestname !== name && !isAdmin) {
    result.remark = "ERR_PERMISSION: You don't have the permission to delete this question.";
    return result;
  }
  const deleteResult = await db.collection("questions").deleteOne({ _id: questionId });
  if (!deleteResult || deleteResult.deletedCount !== 1) {
    result.remark = "ERR_DB: Database error, please try again.";
  } else {
    result.successful = true;
  }
  return result;
}




async function search(_, { input }) {
  const hostname = input.hostname;
  const text = input.text;
  const questions = await db.collection("questions").find({
    hostname: hostname,
    $text: { $search: text, $language: "english" }
  }).toArray();
  return questions.map(digest);
}

async function isAdminUser(name) {
  const result = await db.collection("users").findOne({ name: name });
  return result && result.isAdmin;
}






async function getGroupByName(name) {
  const result = await db.collection("groups").findOne({ name: name });
  if (!result) return null;
  const memberNames = result.memberNames;
  const adminNames = result.admins;
  const members = await db.collection("users").find({ name: { $in: memberNames } }).toArray();
  const memberNicknames = members.map(member => member.nickname);
  const admins = await db.collection("users").find({ name: { $in: adminNames } }).toArray();
  const adminNicknames = admins.map(admin => admin.nickname);
  return {
    name: result.name,
    description: result.description,
    memberNames: memberNames,
    memberNicknames: memberNicknames,
    adminNames: adminNames,
    adminNicknames: adminNicknames
  };
}

async function getGroupById(objectId) {
  const result = await db.collection("groups").findOne({ _id: objectId });
  if (!result) return null;
  const memberNames = result.memberNames;
  const adminNames = result.admins;
  const members = await db.collection("users").find({ name: { $in: memberNames } }).toArray();
  const memberNicknames = members.map(member => member.nickname);
  const admins = await db.collection("users").find({ name: { $in: adminNames } }).toArray();
  const adminNicknames = admins.map(admin => admin.nickname);
  return {
    name: result.name,
    description: result.description,
    memberNames: memberNames,
    memberNicknames: memberNicknames,
    adminNames: adminNames,
    adminNicknames: adminNicknames
  };
}

async function createGroup(_, { input }) {
  const name = input.name.trim();
  const description = input.description;
  const memberNames = input.memberNames;
  const creatorName = input.creatorName;
  const creatorToken = input.creatorToken;
  const result = {
    successful: false,
    groupId: "",
    remark: ""
  };

  if (name === "") {
    result.remark = "ERR_NAME: Name shouldn't be empty!";
    return result;
  }
  if (await getGroupByName(name)) {
    result.remark = "ERR_NAME: A group with such a name already exists."
    return result;
  }
  if (!await validateToken(creatorName, creatorToken)) {
    result.remark = "ERR_TOKEN: The user is not logged in."
    return result;
  }
  console.log(memberNames);
  if (!memberNames.find(element => element === creatorName)) {
    memberNames.push(creatorName);
  }

  const insertResult = await db.collection("groups").insertOne({
    name: name,
    description: description,
    memberNames: memberNames,
    admins: [creatorName]
  });
  if (insertResult.insertedCount === 1) {
    result.successful = true;
  } else {
    result.remark = "ERR_DB: The insert was unsuccessful, please try again.";
  }
  return result;
}

async function getGroupInfo(_, { input }) {
  const groupName = input.groupName;
  const groupId = input.groupId;
  const requestorName = input.requestorName;
  const requestorToken = input.requestorToken;
  const result = {};
  if (!await validateToken(requestorName, requestorToken)) {
    result.remark = "ERR_TOKEN: The user is not signed in.";
    return result;
  }
  if (!groupName && !groupId) {
    result.remark = "ERR_INPUT: You need to specify either the group name or the group id.";
    return result;
  }
  if (groupId) {
    if (!objectIdRegExp.test(groupId)) {
      result.remark = "ERR_ID: The group id is not valid.";
      return result;
    }
    result.info = await getGroupById(ObjectId(groupId));
  } else {
    result.info = await getGroupByName(groupName);
  }
  return result;
}

async function editGroupMember(_, { input }) {
  const groupName = input.groupName;
  const toAdd = input.toAdd;
  const toDelete = input.toDelete;
  const adminName = input.adminName;
  const adminToken = input.adminToken;
  const result = {
    acknowledged: false,
    memberList: [],
    remark: ""
  };
  if (!await validateToken(adminName, adminToken)) {
    result.remark = "ERR_TOKEN: The user is not logged in.";
    return result;
  }
  const groupInfo = await getGroupByName(groupName);
  if (!groupInfo) {
    result.remark = "ERR_GROUPNAME: The group name is not valid.";
    return result;
  }
  if (!groupInfo.adminNames.find(element => element === adminName)) {
    result.remark = "ERR_NAME: The user is not an admin of the group.";
    return result;
  }
  const originalGroup = await getGroupByName(groupName);
  const filteredAdd = (await db.collection("users").find({ name: { $in: toAdd } }).toArray())
    .map(member => member.name)
    .filter(member => !originalGroup.memberNames.includes(member))
    .filter((val, index, array) => array.indexOf(val) === index);
  const addResult = await db.collection("groups").findOneAndUpdate(
    { name: groupName },
    {
      $push: { memberNames: { $each: filteredAdd } }
    },
    { returnNewDocument: true }
  );
  console.log(toDelete);
  const removeResult = await db.collection("groups").findOneAndUpdate(
    { name: groupName },
    {
      $pullAll: { memberNames: toDelete, admins: toDelete }
    },
    { returnNewDocument: true }
  );
  console.log(removeResult.value);
  if (!addResult || !removeResult) {
    result.remark = "ERR_DB: Database error, please try again.";
    return result;
  }
  result.acknowledged = true;
  if (!result.memberList) {
    delGroup(groupName);
    result.remark = "The group is deleted as there are no members.";
  } else if (!removeResult.value.admins) {
    const newAdmin = result.memberList[0];
    db.collection("groups").findOneAndUpdate(
      { name: groupName },
      { $push: { admins: newAdmin } }
    );
    result.remark = newAdmin + " is promoted as an admin.";
  }
  result.memberList = (await getGroupByName(groupName)).memberNames;
  return result;
}

async function editGroupAdmin(_, { input }) {
  const groupName = input.groupName;
  const toAdd = input.toAdd;
  const toDelete = input.toDelete;
  const adminName = input.adminName;
  const adminToken = input.adminToken;
  const result = {
    acknowledged: false,
    adminList: [],
    remark: ""
  };
  if (!await validateToken(adminName, adminToken)) {
    result.remark = "ERR_TOKEN: The user is not logged in.";
    return result;
  }
  const groupInfo = await getGroupByName(groupName);
  if (!groupInfo) {
    result.remark = "ERR_GROUPNAME: The group name is not valid.";
    return result;
  }
  if (!groupInfo.adminNames.find(element => element === adminName)) {
    result.remark = "ERR_NAME: The user is not an admin of the group.";
    return result;
  }
  const original = await getGroupByName(groupName);
  const filteredAdd = toAdd
    .filter(member => original.memberNames.includes(member) && !original.adminNames.includes(member))
    .filter((val, index, array) => array.indexOf(val) === index);
  const pushResult = await db.collection("groups").findOneAndUpdate(
    { name: groupName },
    {
      $push: { admins: { $each: filteredAdd } }
    },
    { returnNewDocument: true }
  );
  const filteredDelete = toDelete
    .filter(member => pushResult.value.admins.includes(member));
  const pullResult = await db.collection("groups").findOneAndUpdate(
    { name: groupName },
    {
      $pullAll: { admins: filteredDelete }
    },
    { returnNewDocument: true }
  );
  if (!pushResult || !pullResult) {
    result.remark = "ERR_DB: Database error, please try again.";
    return result;
  }
  result.acknowledged = true;
  if (!pullResult.value.admins) {
    const newAdmin = pullResult.value.memberNames[0];
    db.collection("groups").findOneAndUpdate(
      { name: groupName },
      { $push: { admins: newAdmin } }
    );
    result.remark = newAdmin + " is promoted as an admin.";
  }
  result.adminList = pullResult.value.admins;
  return result;
}

async function delGroup(name) {
  return db.collection("groups").deleteOne({ name: name });
}

async function deleteGroup(_, { input }) {
  const groupName = input.groupName;
  const adminName = input.adminName;
  const adminToken = input.adminToken;
  const result = {
    successful: false,
    remark: ""
  }
  if (!await validateToken(adminName, adminToken)) {
    result.remark = "ERR_TOKEN: Not logged in.";
    return result;
  }
  const deleteResult = await db.collection("groups").deleteOne({ name: groupName });
  if (!deleteResult || deleteResult.deletedCount !== 1) {
    result.remark = "ERR_DB: Deletion unsuccessful.";
  } else {
    result.successful = true;
  }
  return result;
}

async function updateGroupInfo(_, { input }) {
  const oldName = input.oldName;
  const name = input.name;
  const description = input.description;
  const adminName = input.adminName;
  const adminToken = input.adminToken;
  const result = {
    acknowledged: false,
    remark: ""
  };
  const loggedIn = await validateToken(adminName, adminToken);
  if (!loggedIn) {
    result.remark = "ERR_TOKEN: Not logged in.";
    return result;
  }
  const info = await getGroupByName(oldName);
  if (!info) {
    result.remark = "ERR_GROUPNAME: Group " + oldName + " not found.";
    return result;
  }
  if (!info.adminNames.find(element => element === adminName)) {
    result.remark = "ERR_NAME: The user is not admin of the group.";
    return result;
  }
  const toEdit = {};
  if (name) toEdit.name = name;
  if (description) toEdit.description = description;
  const updateResult = await db.collection("groups").findOneAndUpdate(
    { name: oldName },
    { $set: toEdit },
    { returnNewDocument: true }
  );
  if (!updateResult) {
    result.remark = "ERR_DB: Database error, please try again.";
    return remark;
  }
  result.acknowledged = true;
  result.info = updateResult;
  return result;
}





async function profanityCheck(content) {
  const key = "2808eded703748f8b567add73697bda9";
  const url = "https://southeastasia.api.cognitive.microsoft.com/contentmoderator/moderate/v1.0/ProcessText/Screen?autocorrect=True&PII=True&classify=True&language=eng";
  const config = {
    headers: {
      'Content-Type': 'text/plain',
      'Ocp-Apim-Subscription-Key': key,
    }
  }
  const result = await axios.post(url, { body: content }, config);
  const classification = result.data.Classification;
  return classification.ReviewRecommended;
}






async function updateUserInfo(_, { input }) {
  const hobbies = input.hobbies ? input.hobbies : [];
  const country_region = input.country_region;
  const name = input.name;
  const nickname = input.nickname;
  const sex = input.sex;
  const birthday = input.birthday;
  const token = input.token;
  const result = {
    successful: false
  };
  console.log("input", input)
  if (!await validateToken(name, token)) {
    result.remark = "ERR_TOKEN: User not logged in.";
    return result;
  }
  const updateResult = await db.collection("users").findOneAndUpdate({ name: name }, {
    $set: {
      country_region: country_region,
      sex: sex,
      nickname: nickname,
      birthday: birthday,
      hobbies: hobbies
    }
  });
  if (!updateResult) {
    result.remark = "ERR_DB: Please try again.";
    return result;
  }
  result.successful = true;
  return result;
}


async function getUserInfo(_, { input }) {
  const name = input.name;
  const token = input.token;
  if (!await validateToken(name, token)) {
    return null;
  }

  try {
    const findResult = await db.collection("users").findOne({ name: name });
    console.log('findResult:', findResult);
    return findResult;
  } catch (error) {
    console.error('Error in getUserInfo:', error);
    return null;
  }
}

async function getQuestionDetail(_, { input }) {
  const questionId = input.questionId;
  try {
    const result = await db.collection("questions").findOne({ _id: ObjectId(questionId) });
    if (result) return digest(result);
    return null;
  } catch (error) {
    console.error("Error in getQuestionDetail:", error);
    return null;
  }
}

async function getQuestionsByGuest(_, { input }) {
  const guestname = input.guestname;
  const token = input.token;
  const result = {
    successful: false,
    remark: "",
    questions: []
  }
  if (!await validateToken(guestname, token)) {
    result.remark = "ERR_TOKEN: User is not logged in.";
    return result;
  }
  try {
    const questions = await db.collection("questions").find({ guestname: guestname }).toArray();
    result.questions = questions.map(digest);
    result.successful = true;
    return result;
  } catch (error) {
    result.remark = "ERR_DB: Please try again."
    return result;
  }
}


// Below are db-related















async function connectToDb() {
  const client = new MongoClient(url, { useNewUrlParser: true });
  for (var i = 0; i < 5; i++) {
    try {
      await client.connect();
    } catch (error) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      continue;
    }
    break;
  }
  console.log('Connected to MongoDB at', url);
  db = client.db();
}

const server = new ApolloServer({
  typeDefs: fs.readFileSync('./server/schema.graphql', 'utf-8'),
  resolvers,
  formatError: error => {
    console.log(error);
    return error;
  },
});

const app = express();

app.use(express.static('public'));

const path = require('path');
const { re } = require("@babel/core/lib/vendor/import-meta-resolve");

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});



server.applyMiddleware({ app, path: '/graphql' });

(async function () {
  try {
    await connectToDb();
    app.listen(3000, function () {
      console.log('App started on port 3000');
    });
    removeExpiredTokens();
  } catch (err) {
    console.log('ERROR:', err);
  }
})();
