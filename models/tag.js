var mongoose = require('mongoose')
var Schema = mongoose.Schema

var TagSchema = new Schema({
    name: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

exports.Tag = mongoose.model('Tag', TagSchema)
