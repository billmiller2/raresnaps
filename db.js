require('dotenv').config({ path: __dirname + '/.env' })

var mongoose = require('mongoose')
var mongoDB = `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@127.0.0.1:27017/${process.env.DB_NAME}`
var db

module.exports = {
    connect: () => mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(
            () => { db = mongoose.connection },
            err => console.log(err)
        ),
    getDb: () => db
}
