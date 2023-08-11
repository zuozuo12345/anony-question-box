


const dateRegex = new RegExp('^\\d\\d\\d\\d-\\d\\d-\\d\\d');
function jsonDateReviver(key, value) {
  if (dateRegex.test(value)) return new Date(value);
  return value;
}

var tokenClient;
const CLIENT_ID = "235123572069-3qul5k0egqtegb31bh7qs4fmeiljkfta.apps.googleusercontent.com";
const API_KEY = "AIzaSyDJPl5FJ4Y1QMISN4c5YBMTtTuYray0eyI";
const DISCOVERY_DOC = 'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest';
const SCOPES = 'https://www.googleapis.com/auth/calendar.readonly';
let gapiInited = false;
let gisInited = false;

function gapiLoaded() {
  gapi.load('client', initializeGapiClient);
}

async function initializeGapiClient() {
  await gapi.client.init({
    apiKey: API_KEY,
    discoveryDocs: [DISCOVERY_DOC]
  });
  gapiInited = true;
}

function gisLoaded() {
  tokenClient = google.accounts.oauth2.initTokenClient({
    client_id: CLIENT_ID,
    scope: SCOPES,
    callback: ''
  });
  gisInited = true;
}

async function graphQLFetch(query, variables = {}) {
  try {
    const response = await fetch('/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, variables })
    });
    const body = await response.text();
    const result = JSON.parse(body, jsonDateReviver);

    if (result.errors) {
      const error = result.errors[0];
      if (error.extensions.code === 'BAD_USER_INPUT') {
        const details = error.extensions.exception.errors?.join('\n ');
        alert(`${error.message}:\n ${details}`);
      } else {
        alert(`${error.extensions.code}: ${error.message}`);
      }
    }
    return result.data;
  } catch (e) {
    alert(`Error in sending data to server: ${e.message}`);
  }
}

async function getInfo() {
  const name = localStorage.getItem("name");
  const token = localStorage.getItem("token");
  console.log("in signup and login token and name", token, name)
  if (name && token) {
    const query = `
    query GetUserInfo($input: GetUserInfo!) {
      getUserInfo(input: $input) {
        userId
        name
        nickname
        birthday
        sex
        hobbies
        country_region
      }
    }
  `;
    return await graphQLFetch(query, { input: { name, token } });
  }
  return null;
}


class MyInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: null,
      editing: false,
    };
    this.handleEdit = this.handleEdit.bind(this);
    this.handleFinish = this.handleFinish.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleLogout = this.handleLogout.bind(this);

  }

  async componentDidMount() {
    const result = await getInfo();
    if (result && result.getUserInfo) {
      this.setState({ userInfo: result.getUserInfo });
    } else {
      alert("Please login or signup first!");
    }
  }


  handleEdit() {
    this.setState({ editing: true });
  }

  handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    this.props.onLogout();
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      userInfo: { ...this.state.userInfo, [name]: value },
    });
  }

  async handleFinish() {
    const query = `
      mutation UpdateUserInfo($input: UpdateUserInfo!) {
        updateUserInfo(input: $input) {
          successful
          remark
        }
      }
    `;
    const { userInfo } = this.state;
    const { token, name } = this.props;
    const input = { ...userInfo, token, name };
    const result = await graphQLFetch(query, { input });
    if (result.updateUserInfo.successful) {
      this.setState({ editing: false });
    } else {
      alert(result.updateUserInfo.remark);
    }
  }

  render() {
    const { name } = this.props;
    const { token } = this.props;
    if (!name || !token) {
      return <SignupAndLogin onLoginSuccess={this.props.onLoginSuccess} />;
    }
    const { userInfo, editing } = this.state;
    if (!userInfo) return <div>Loading...</div>;

    const countries = [
      "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cabo Verde", "Cambodia", "Cameroon", "Canada", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo (Brazzaville)", "Congo (Kinshasa)", "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czechia", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "East Timor", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini", "Ethiopia", "Fiji", "Finland", "France", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Ivory Coast", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Korea, North", "Korea, South", "Kosovo", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Macedonia", "Norway", "Oman", "Pakistan", "Palau", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar", "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City", "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"
    ];

    return (
      <div className={"myInfo"} id="my-info">
        <h2>Myself Info</h2>
        <div className="infoTable">
          {Object.entries(userInfo).map(([key, value]) => {
            if (key === 'name') return null;
            if (key === 'userId') return null;

            let displayValue;
            if (editing) {
              if (key === 'sex') {
                displayValue = (
                  <select name="sex" value={value || ''} onChange={this.handleInputChange}>
                    <option value="not tell">Not Tell</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                );
              } else if (key === 'country_region') {
                displayValue = (
                  <select name="country_region" value={value || ''} onChange={this.handleInputChange}>
                    <option value="">Select Country</option>
                    {countries.map(country => (
                      <option key={country} value={country}>
                        {country}
                      </option>
                    ))}
                  </select>
                );
              } else {
                displayValue = (
                  <input
                    type={key === 'birthday' ? 'date' : 'text'}
                    name={key}
                    value={value || ''}
                    onChange={this.handleInputChange}
                    readOnly={key === 'name' || key === 'userId'}
                  />
                );
              }
            } else {
              displayValue = (
                <span>{key === 'birthday' && value ? new Date(value).toLocaleDateString() : value || '-'}</span>
              );
            }

            return (
              <div key={key}>
                <label>{key}:</label>
                {displayValue}
              </div>
            );
          })}
        </div>
        <div>
          {editing ? (
            <button onClick={this.handleFinish}>Finish</button>
          ) : (
            <button onClick={this.handleEdit}>Edit</button>
          )
          }
          <button onClick={this.handleLogout}>Logout</button>
        </div>
      </div>
    );
  }
}

class Index extends React.Component {
  render() {
    return <div className={"index"}>
      <p className={"title"}>Welcome to the Anonymous Question Box!</p>
      <p className={"intro"}>
        This is an anonymous question box, where you can share your question box with others via URL, and  expect questions from others.
        All the questions and answers will be anonymous. And don't worry, potentially hazardous contents are automatically filtered by NLP.
        Have fun!
      </p>
    </div>;
  }
}

class MyQuestion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questionsWithAnswers: [],
    };
    this.refresh = this.refresh.bind(this);
  }

  async refresh() {
    const token = localStorage.getItem('token');
    const name = localStorage.getItem('name');

    if (!token || !name) {
      this.props.history.push('/signup-and-login');
      return;
    }

    const guestname = name;

    // Replace the getQuestions call with a GraphQL query
    const getQuestionsQuery = `
      query gbg($input: GetQuestionsByGuest!) {
        getQuestionsByGuest(input: $input) {
          successful, questions{questionId, content, timestamp, hostname, guestname}, remark
        }
      }
    `;

    const input = { guestname: guestname, token: token };
    const questionsResult = await graphQLFetch(getQuestionsQuery, { input });
    if (!questionsResult.getQuestionsByGuest.successful) {
      alert(questionsResult.getQuestionsByGuest.remark);
      this.props.history.push('/');
      return;
    }
    const questions = questionsResult.getQuestionsByGuest.questions;

    const questionsWithAnswers = await Promise.all(
      questions.map(async (question) => {
        // Replace the getAnswers call with a GraphQL query
        const getAnswersQuery = `
            query GetAnswers($input: GetAnswers!) {
              getAnswers(input: $input) {
                content
                isHost
                questionId
                timestamp
              }
            }
          `;

        const answersResult = await graphQLFetch(getAnswersQuery, { input: { questionId: question.questionId } });
        const answers = answersResult.getAnswers;
        if (answers.length > 0) {
          return { question, answers };
        }
        return { question, answers: [] };
      })
    );

    this.setState({ questionsWithAnswers: questionsWithAnswers.filter((q) => q !== null) });
  }

  async componentDidMount() {
    await this.refresh();
  }

  render() {
    return (<div>
      {this.state.questionsWithAnswers.map((q, index) =>
        <QuestionAndAnswer key={index} refreshHandler={this.refresh} canDelete={true} showHost={true} {...q} />)}
      {/*<div key={index} style={{ border: '1px solid black', margin: '10px', padding: '10px' }}>
            <div>Question: {q.question.content}</div>
            {q.answers.map((answer, index) => (
                <div key={index}>Answer: {answer.content}</div>
            ))}
          </div>
      ))}*/}
    </div>);
  }
}

class MyAnswers extends React.Component {
  render() {
    return <span>My Answers</span>;
  }
}

class MyGroup extends React.Component {
  render() {
    return <span>My Group</span>;
  }
}


class AskQuestionBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      question: '',
      submitted: false,
      questionsWithAnswers: [],
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.fetchQuestions = this.fetchQuestions.bind(this);
  }

  componentDidMount() {
    this.fetchQuestions();
  }

  handleInputChange(e) {
    const token = localStorage.getItem('token');
    const name = localStorage.getItem('name');
    const hostname = new URLSearchParams(this.props.location.search).get('name');
    if (!token || !name) {
      // Redirect to SignupAndLogin
      localStorage.setItem('hostname', hostname)
      this.props.history.push('/signup-and-login');
      return;
    }
    this.setState({ question: e.target.value });
  }

  async handleSubmit(e) {
    e.preventDefault();
    const { question } = this.state;
    // Check if there's a token and name in localStorage
    const token = localStorage.getItem('token');
    const name = localStorage.getItem('name');

    if (!token || !name) {
      // Redirect to SignupAndLogin
      localStorage.setItem('hostname', hostname)
      this.props.history.push('/signup-and-login');
      return;
    }
    const hostname = new URLSearchParams(this.props.location.search).get('name');
    const guestname = localStorage.getItem('name');

    const query = `
      mutation CreateQuestion($input: CreateQuestion!) {
        createQuestion(input: $input) {
          successful
          questionId
          remark
        }
      }
    `;
    const input = { hostname, guestname, content: question, token };
    const result = await graphQLFetch(query, { input });

    if (result.createQuestion.successful) {
      alert('Question submitted successfully.');
      this.setState({ submitted: true });
    } else {
      alert(`Error: ${result.createQuestion.remark}`);
    }
    // Submit the question and fetch updated questions list
    // ... your submission logic here ...
    // this.fetchQuestions();
  }


  async fetchQuestions() {
    const token = localStorage.getItem('token');
    const name = localStorage.getItem('name');

    // if (!token || !name) {
    //   this.props.history.push('/signup-and-login');
    //   return;
    // }

    const hostname = this.props.location.search.split('=')[1];

    // Replace the getQuestions call with a GraphQL query
    const getQuestionsQuery = `
            query GetQuestions($input: GetQuestions!) {
              getQuestions(input: $input) {
                questionId
                content
                timestamp
              }
            }
          `;

    const questionsResult = await graphQLFetch(getQuestionsQuery, { input: { hostname } });
    const questions = questionsResult.getQuestions;

    const questionsWithAnswers = await Promise.all(
      questions.map(async (question) => {
        // Replace the getAnswers call with a GraphQL query
        const getAnswersQuery = `
                    query GetAnswers($input: GetAnswers!) {
                      getAnswers(input: $input) {
                        content
                        isHost
                        questionId
                        timestamp
                      }
                    }
                  `;

        const answersResult = await graphQLFetch(getAnswersQuery, { input: { questionId: question.questionId } });
        const answers = answersResult.getAnswers;
        if (answers.length > 0) {
          return { question, answers };
        }
        return { question, answers: [] };
      })
    );

    this.setState({ questionsWithAnswers: questionsWithAnswers.filter((q) => q !== null) });
  }

  render() {
    const { question, submitted, questionsWithAnswers } = this.state;
    const hostname = this.props.location.search.split('=')[1];

    return (
      <div>
        <div className="ask-question-box">
          <h2>Ask a question to {new URLSearchParams(this.props.location.search).get('name')}</h2>
          {/* Input and submit */}
          <form onSubmit={this.handleSubmit}>
            <input
              type="text"
              value={question}
              onChange={this.handleInputChange}
              placeholder="Ask a question"
              required
            />
            <button type="submit">Submit</button>
          </form>
        </div>
        <div>
          {questionsWithAnswers.map((q, index) => (
            <QuestionAndAnswer key={index} refreshHandler={this.refresh} canDelete={true} {...q} />))}
        </div>
      </div>
    );
  }
}



class GenerateQuestionBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questionsWithAnswers: [],
      showUrl: false,
    };
    this.urlRef = React.createRef();
    this.refresh = this.refresh.bind(this);
  }

  async refresh() {

    const token = localStorage.getItem('token');
    const name = localStorage.getItem('name');

    if (!token || !name) {
      this.props.history.push('/signup-and-login');
      return;
    }

    const hostname = name;

    // Replace the getQuestions call with a GraphQL query
    const getQuestionsQuery = `
      query GetQuestions($input: GetQuestions!) {
        getQuestions(input: $input) {
          questionId
          content
          timestamp
        }
      }
    `;

    const questionsResult = await graphQLFetch(getQuestionsQuery, { input: { hostname } });
    const questions = questionsResult.getQuestions;

    const questionsWithAnswers = await Promise.all(
      questions.map(async (question) => {
        // Replace the getAnswers call with a GraphQL query
        const getAnswersQuery = `
        query GetAnswers($input: GetAnswers!) {
          getAnswers(input: $input) {
            content
            isHost
            questionId
            timestamp
          }
        }
      `;

        const answersResult = await graphQLFetch(getAnswersQuery, { input: { questionId: question.questionId } });
        const answers = answersResult.getAnswers;
        if (answers.length > 0) {
          return { question, answers };
        }
        return null;
      })
    );

    this.setState({ questionsWithAnswers: questionsWithAnswers.filter((q) => q !== null) });
  }

  async componentDidMount() {
    await this.refresh();
  }


  generateUrl() {
    const name = localStorage.getItem('name');
    return `localhost:3000/ask-question?name=${name}`;
  }

  copyUrlToClipboard() {
    this.urlRef.current.select();
    document.execCommand('copy');
    alert('URL copied to clipboard!');
  }

  handleClickGenerate() {
    this.setState({ showUrl: true });
  }

  render() {
    const { questionsWithAnswers, showUrl } = this.state;

    return (
      <div>
        <div style={{ textAlign: "center" }}>
          <input
            type="text"
            ref={this.urlRef}
            value={this.generateUrl()}
            readOnly
            style={{ width: '80%', marginRight: '10px' }}
          />
          <button onClick={() => this.copyUrlToClipboard()}>Copy URL</button>
        </div>
        <div>
          {questionsWithAnswers.map((q, index) => (
            <QuestionAndAnswer key={index} refreshHandler={this.refresh} canDelete={true} {...q} />))}
          {/*<div key={index} style={{ border: '1px solid black', margin: '10px', padding: '10px' }}>
                  <div>Question: {q.question.content}</div>
                  {q.answers.map((answer, index) => (
                      <div key={index}>Answer: {answer.content}</div>
                  ))}
                </div>
            ))}*/}
        </div>
      </div>
    );
  }
}



class SignupAndLogin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signupForm: { name: "", nickname: "", password: "" },
      loginForm: { name: "", nickname: "", password: "" },
    };

    this.handleSignupChange = this.handleSignupChange.bind(this);
    this.handleLoginChange = this.handleLoginChange.bind(this);
    this.handleSubmitSignUp = this.handleSubmitSignUp.bind(this);
    this.handleSubmitLogIn = this.handleSubmitLogIn.bind(this);
  }

  handleSignupChange(e) {
    this.setState({
      signupForm: { ...this.state.signupForm, [e.target.name]: e.target.value },
    });
  }

  handleLoginChange(e) {
    this.setState({
      loginForm: { ...this.state.loginForm, [e.target.name]: e.target.value },
    });
  }

  async handleSubmitSignUp(e) {
    e.preventDefault();
    const query = `
      mutation SignUp($input: SignUpInput!) {
        signUp(input: $input) {
          successful
          token
          expiration
          remark

        }
      }
    `;
    const result = await graphQLFetch(query, { input: this.state.signupForm });
    if (result.signUp.successful) {
      this.props.onLoginSuccess({
        token: result.signUp.token,
        name: this.state.signupForm.name,
      });
    } else {
      alert(result.signUp.remark);
    }
  }

  async handleSubmitLogIn(e) {
    e.preventDefault();
    const query = `
    mutation LogIn($input: LogInInput!) {
      logIn(input: $input) {
        successful
        token
        expiration
        remark
        userId
      }
    }
  `;

    const result = await graphQLFetch(query, { input: this.state.loginForm });
    if (result.logIn.successful) {
      this.props.onLoginSuccess({
        token: result.logIn.token,
        name: this.state.loginForm.name,
      });
      alert("Login successfully!");
      const hostname = localStorage.getItem('hostname')
      localStorage.removeItem('hostname')
      if (hostname) {
        this.props.history.push(`/ask-question?name=${hostname}`);
      }
      // Navigate to the new URL after a successful login

    } else {
      alert(result.logIn.remark);
    }
  }



  render() {
    const { signupForm, loginForm } = this.state;

    return (
      <div className="App">
        <div className="sign-up">
          <h2>Sign Up</h2>
          <form onSubmit={this.handleSubmitSignUp}>
            <input
              type="text"
              name="name"
              value={signupForm.name}
              onChange={this.handleSignupChange}
              placeholder="Name(Unique)"
              required
            />
            <input
              type="text"
              name="nickname"
              value={signupForm.nickname}
              onChange={this.handleSignupChange}
              placeholder="Nickname"
              required
            />
            <input
              type="password"
              name="password"
              value={signupForm.password}
              onChange={this.handleSignupChange}
              placeholder="Password"
              required
            />
            <div>
              The password should include 1 Upper character and 1 number, and total length of it over 6 characters.
            </div>
            <button type="submit">Sign Up</button>
          </form>
        </div>

        <div className="log-in">
          <h2>Login</h2>
          <form onSubmit={this.handleSubmitLogIn}>
            <input
              type="text"
              name="name"
              value={loginForm.name}
              onChange={this.handleLoginChange}
              placeholder="Name"
              required
            />
            {/*<input
                  type="text"
                  name="nickname"
                  value={loginForm.nickname}
                  onChange={this.handleLoginChange}
                  placeholder="Nickname"
                  required
              />*/}
            <input
              type="password"
              name="password"
              value={loginForm.password}
              onChange={this.handleLoginChange}
              placeholder="Password"
              required
            />
            <button type="submit">Log In</button>
          </form>
        </div>
      </div>
    );
  }
}


class Question extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questionId: this.props.location.search.split('=')[1],
      questionContent: "",
      timestamp: "",
      answers: [],
      answerContent: "",
      redirected: false,
      info: "birthday",
      infoDisplay: ""
    }
    this.myInfo = ["birthday", "hobbies", "country_region", "events of today"];
    this.handleAnswerChange = this.handleAnswerChange.bind(this);
    this.submitAnswer = this.submitAnswer.bind(this);
    this.changeSelect = this.changeSelect.bind(this);
    this.queryInfo = this.queryInfo.bind(this);
    this.showCalendarEvents = this.showCalendarEvents.bind(this);
  }

  async refresh() {
    const queryDetail = `
      query gq($input:GetQuestionDetail!) {
        getQuestionDetail(input:$input) {
          questionId, content, timestamp
        }
      }
    `;
    const inputDetail = { questionId: this.state.questionId };
    const digest = await graphQLFetch(queryDetail, { input: inputDetail });
    if (!digest || !digest.getQuestionDetail) {
      this.setState({ redirected: true });
      return;
    }
    this.setState({ questionContent: digest.getQuestionDetail.content, timestamp: digest.getQuestionDetail.timestamp.toString() });

    const queryAnswers = `
      query ga($input:GetAnswers!) {
        getAnswers(input:$input){
          content, isHost, timestamp
        }
      }
    `;
    const inputAnswers = {
      questionId: this.state.questionId,
      limit: 100
    };
    const answers = await graphQLFetch(queryAnswers, { input: inputAnswers });
    console.log(answers.getAnswers);
    this.setState({ answers: answers.getAnswers });
  }

  async componentDidMount() {
    await this.refresh();
  }

  handleAnswerChange(e) {
    this.setState({
      answerContent: e.target.value
    });
  }

  async submitAnswer(e) {
    e.preventDefault();
    const query = `
      mutation ca($input: CreateAnswer!) {
        createAnswer(input:$input) {
          successful, answerId, remark
        }
      }
    `;
    const input = {
      questionId: this.state.questionId,
      content: this.state.answerContent,
      guestname: localStorage.getItem("name"),
      token: localStorage.getItem("token")
    };
    const result = await graphQLFetch(query, { input });
    if (result.createAnswer.successful) {
      this.setState({ answerContent: "" });
      await this.refresh();
    } else {
      const remark = result.createAnswer.remark;
      alert(remark);
      if (remark.startsWith("ERR_TOKEN") || remark.startsWith("ERR_QUESTION")) {
        this.setState({ redirected: true });
      }
    }
  }

  async changeSelect(e) {
    this.setState({ info: e.target.value });
  }

  async queryInfo(e) {
    const info = this.state.info;
    if (info === "events of today") {
      tokenClient.callback = async (resp) => {
        if (resp.error !== undefined) {
          alert(resp);
          return;
        }
        await this.showCalendarEvents();
      }
      if (gapi.client.getToken() === null) {
        tokenClient.requestAccessToken({ prompt: "consent" });
      } else {
        tokenClient.requestAccessToken({ prompt: "" });
      }
    } else if (info) {
      const result = await getInfo();
      console.log(result);
      if (!result || !result.getUserInfo) {
        alert("Log in session expired, please log in again!");
        this.setState({ infoDisplay: "" });
      } else {
        if (info === "birthday") {
          const birthday = result.getUserInfo[info];
          if (birthday) {
            this.setState({ infoDisplay: birthday.toISOString().split('T')[0] });
          } else {
            this.setState({infoDisplay: ""});
          }
        } else {
          this.setState({infoDisplay: result.getUserInfo[info] || ""});
        }
      }
    } else {
      this.setState({ infoDisplay: "" });
    }
  }

  async showCalendarEvents() {
    this.setState({ infoDisplay: "Getting calendar events..." });
    let response;
    try {
      const listRequest = { 'maxResults': 100 };
      response = await gapi.client.calendar.calendarList.list(listRequest);
    } catch (err) {
      alert(err);
      this.setState({ infoDisplay: "" });
      return;
    }
    const calendarIds = response.result.items.map(x => x.id);
    var start = new Date();
    start.setHours(0, 0, 0, 0);
    var end = new Date();
    end.setHours(23, 59, 59, 999);
    const events = [];
    try {
      for (const id of calendarIds) {
        const getResult = await gapi.client.calendar.events.list({
          calendarId: id,
          timeMin: start.toISOString(),
          timeMax: end.toISOString(),
          singleEvents: true,
          orderBy: 'startTime'
        });
        if (getResult && getResult.result.items) {
          events.push(...getResult.result.items.map(x => x.summary + ", starts from " + (x.start.dateTime || x.start.date)));
        }
      }
    } catch (err) {
      alert(err);
      this.setState({ infoDisplay: "" });
      return;
    }
    this.setState({ infoDisplay: events ? events.join("\n") : "No events today!" });
  }

  render() {
    if (this.state.redirected) {
      return (<ReactRouterDOM.Navigate to="/my-questions" />);
    }
    return <div className="question">
      <div className={"questionTitle"}>
        <p style={{ color: "gray", fontSize: "10px" }}>{this.state.timestamp}</p>
        <p>{this.state.questionContent}</p>
      </div>
      {this.state.answers.map((answer, index) => (
        <div className={"questionAnswer"} key={index}>
          <p style={{ color: "gray", fontSize: "10px" }}>{answer.timestamp + (answer.isHost === "true" ? " by host" : "")}</p>
          <p>{answer.content}</p>
        </div>
      ))}
      <div className="questionInput">
        <input
          type="text"
          name="answerContent"
          value={this.state.answerContent}
          onChange={this.handleAnswerChange}
          placeholder=""
        />
        <button onClick={this.submitAnswer}>Submit</button>
      </div>
      <div className="questionFast">
        <p>The questions is related to your personal information? Check from here!</p>
        <select onChange={this.changeSelect}>
          {this.myInfo.map((s, index) => <option key={index} value={s}>{s}</option>)}
        </select>
        <button onClick={this.queryInfo}>Get</button>
        <p>{this.state.infoDisplay}</p>
      </div>
    </div>;
  }
}

class QuestionAndAnswer extends React.Component {
  constructor(props) {
    super(props);
    this.deleteThis = this.deleteThis.bind(this);
  }

  async deleteThis(e) {
    const mutation = `
      mutation dq($input: DeleteQuestion!) {
        deleteQuestion(input:$input) {
          successful, remark
        }
      }
    `;
    const input = {
      questionId: this.props.question.questionId,
      name: localStorage.getItem("name"),
      token: localStorage.getItem("token")
    };
    try {
      const deleteResult = await graphQLFetch(mutation, { input });
      if (!deleteResult.deleteQuestion.successful) {
        alert(deleteResult.deleteQuestion.remark);
      }
    } catch (error) {
      alert('Error in deletion: ' + error);
    }
    if (this.props.refreshHandler) {
      this.props.refreshHandler();
    }
  }


  render() {
    return (<div className="qna">
      <ReactRouterDOM.Link to={"/question?id=" + this.props.question.questionId} style={{ textDecoration: 'none' }}>
        <div className={"qnaTitle"}>
          <p style={{ color: "gray", fontSize: "10px" }}>{this.props.question.timestamp.toISOString() + (this.props.showHost ? " to " + this.props.question.hostname : "")}</p>
          <p>{this.props.question.content}</p>
        </div>
        {this.props.answers.map((answer, index) => (
          <div className={"qnaAnswer"} key={index}>
            <p style={{ color: "gray", fontSize: "10px" }}>{answer.timestamp.toString() + answer.isHost ? " by host" : ""}</p>
            <p>{answer.content}</p>
          </div>
        ))}
      </ReactRouterDOM.Link>
      {this.props.canDelete && <button className={"qnaDelete"} onClick={this.deleteThis}>Delete</button>}
    </div>);
  }
}

class QuestionsForMe extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      unansweredQuestions: [],
      answeredQuestions: []
    }
    this.refresh = this.refresh.bind(this);
  }

  async componentDidMount() {
    await this.refresh();
  }

  async refresh() {
    const token = localStorage.getItem("token");
    const name = localStorage.getItem("name");

    if (!token || !name) {
      this.props.history.push('signup-and-login');
      return;
    }

    const hostname = name;
    const getQuestionsQuery = `
      query gq($input: GetQuestions!) {
        getQuestions(input:$input) {
          questionId, content, timestamp, hostname, guestname
        }
      }
    `;
    const input = { hostname: hostname };
    const getQuestionsResult = await graphQLFetch(getQuestionsQuery, { input });
    const questions = getQuestionsResult.getQuestions;
    const getAnswersQuery = `
      query ga($input: GetAnswers!) {
        getAnswers(input: $input) {
          content, isHost, questionId, timestamp
        }
      }
    `;
    const qna = await Promise.all(
      questions.map(
        async (question) => {
          const getAnswersResult = await graphQLFetch(getAnswersQuery, { input: { questionId: question.questionId } });
          return { question: question, answers: getAnswersResult.getAnswers };
        }
      )
    );
    this.setState({
      answeredQuestions: qna.filter(x => x.answers),
      unansweredQuestions: qna.filter(x => !x.answers)
    });
  }

  render() {
    return (<div>
      {this.state.unansweredQuestions.map((x, index) => <QuestionAndAnswer key={index} {...x} refreshHandler={this.refresh} canDelete={true} />)}
      {this.state.answeredQuestions.map((x, index) => <QuestionAndAnswer key={index} {...x} refreshHandler={this.refresh} canDelete={true} />)}
    </div>)
  }
}

class Main extends React.Component {
  render() {
    return <ReactRouterDOM.Redirect to="/index" />;
  }
}


class Navigation extends React.Component {
  render() {
    return (
      <div>
        <nav>
          <ul>
            <li>
              <ReactRouterDOM.Link to="/index">Index</ReactRouterDOM.Link>
            </li>
            <li>
              <ReactRouterDOM.Link to="/publish-question">My Question Box</ReactRouterDOM.Link>
            </li>
            <li>
              <ReactRouterDOM.Link to="/my-questions">My Questions</ReactRouterDOM.Link>
            </li>
            <li>
              <ReactRouterDOM.Link to="/questions-for-me">Questions for Me</ReactRouterDOM.Link>
            </li>
            <li>
              <ReactRouterDOM.Link to="/my-info">My Info</ReactRouterDOM.Link>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
}


class App extends React.Component {
  constructor(props) {
    const token = localStorage.getItem("token");
    const name = localStorage.getItem("name");
    super(props);
    this.state = {
      token: token,
      name: name,
    };
    this.handleLoginSuccess = this.handleLoginSuccess.bind(this);

  }

  handleLoginSuccess({ token, name }) {
    localStorage.setItem("token", token);
    localStorage.setItem("name", name);
    this.setState({ token, name });
  }

  handleLogout = () => {
    this.setState({ token: null, name: null });
  };


  render() {
    const { token, name } = this.state;
    return (
      <ReactRouterDOM.BrowserRouter>
        <div>
          <Navigation />
          <ReactRouterDOM.Switch>
            <ReactRouterDOM.Route exact path="/" component={Main} />
            <ReactRouterDOM.Route exact path="/index" component={Index} />
            <ReactRouterDOM.Route path="/publish-question" component={GenerateQuestionBox} />
            <ReactRouterDOM.Route
              path="/ask-question"
              render={(props) => <AskQuestionBox {...props} />}
            />
            <ReactRouterDOM.Route path="/my-questions" component={MyQuestion} />
            <ReactRouterDOM.Route path="/questions-for-me" component={QuestionsForMe} />
            <ReactRouterDOM.Route path="/my-group" component={MyGroup} />
            <ReactRouterDOM.Route
              path="/signup-and-login"
              render={(props) => (
                <SignupAndLogin {...props} onLoginSuccess={this.handleLoginSuccess} />
              )}
            />
            <ReactRouterDOM.Route
              path="/my-info"
              render={(props) => (
                <MyInfo {...props}
                  token={token}
                  name={name}
                  onLoginSuccess={this.handleLoginSuccess}
                  onLogout={this.handleLogout}
                />
              )}
            />
            <ReactRouterDOM.Route
              path={"/question"}
              component={Question}
            />
          </ReactRouterDOM.Switch>
        </div>
      </ReactRouterDOM.BrowserRouter>
    );
  }
}


// export default ReactRouterDOM.withRouter(SignupAndLogin)

const element = <App />;

ReactDOM.render(element, document.getElementById("contents"));
