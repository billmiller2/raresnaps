var mongoose = require('mongoose')
var Schema = mongoose.Schema

var GroupSchema = new Schema({
    name: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

exports.Group = mongoose.model('Group', GroupSchema)
