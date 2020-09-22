var mongoose = require('mongoose')
var Schema = mongoose.Schema

var CommentSchema = new Schema({
    comment: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

exports.Comment = mongoose.model('Comment', CommentSchema)
