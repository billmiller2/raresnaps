var mongoose = require('mongoose')
var Schema = mongoose.Schema

var UserSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    usernameLowercase: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    group: {
        type: Schema.Types.ObjectId,
        ref: 'Group'
    }
}, {
    timestamps: true
})

exports.User = mongoose.model('User', UserSchema)
