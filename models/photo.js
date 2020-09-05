var mongoose = require('mongoose')
var Schema = mongoose.Schema

var PhotoSchema = new Schema({
    key: {
        type: String,
        required: true
    },
    tags: [{
        type: Schema.Types.ObjectId,
        ref: 'Tag'
    }]
}, {
    timestamps: true
})

exports.Photo = mongoose.model('Photo', PhotoSchema)
