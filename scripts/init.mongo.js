
db.users.remove({})
db.users.dropIndexes()
db.users.createIndex({ name: 1 }, { unique: true })

db.tokens.remove({})
db.tokens.dropIndexes()
db.tokens.createIndex({ name: 1 }, { unique: true })

db.questions.remove({})
db.questions.dropIndexes()
db.questions.createIndex({ hostname: 'hashed' }, { sparse: true })
db.questions.createIndex({ guestname: 'hashed' })
db.questions.createIndex({ groupname: 'hashed' }, { sparse: true })
db.questions.createIndex({ content: "text" })

db.answers.remove({})
db.answers.dropIndexes()
db.answers.createIndex({ questionsId: 1 })
