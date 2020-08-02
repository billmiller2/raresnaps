var mongoose = require('mongoose')
var Schema = mongoose.Schema

var PhotoSchema = new Schema({
    key: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

exports.Photo = mongoose.model('Photo', PhotoSchema)
