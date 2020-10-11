var mongoose = require('mongoose')
var mongoDB = `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@127.0.0.1:27017/raresnaps-dev`
mongoose.connect(mongoDB, { useNewUrlParser: true })
var db = mongoose.connection
db.on('error', console.error.bind(console, 'MongoDB connection error:'))
