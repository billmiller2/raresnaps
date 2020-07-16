const { body } = require('express-validator')

const { User } = require('../../models/user')

exports.create = createUserValidator = [
    body('username').not().isEmpty().escape().trim().custom(value => {
        return User.findOne({ username: value }).exec().then(user => {
            if (user) {
                return Promise.reject('username is taken')
            }
        })
    }),

    body('password').not().isEmpty().escape().trim(),
    body('confirm_password').not().isEmpty().escape().trim().custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error('Password confirmation does not match password')
        }
        return true
    })
]

exports.login = [
    body('username').not().isEmpty().escape().trim().custom(value => {
        return User.findOne({ username: value }).exec().then(user => {
            if (!user) {
                return Promise.reject('username not found')
            }
        })
    })
]

