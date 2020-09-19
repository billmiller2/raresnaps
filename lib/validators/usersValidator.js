const { body } = require('express-validator')
const bcrypt = require('bcrypt')

const { User } = require('../../models/user')

exports.create = createUserValidator = [
    body('username').not().isEmpty().escape().trim().custom(value => {
        return User.findOne({ username: value }).exec()
            .then(user => {
                if (user) {
                    return Promise.reject('username is taken')
                }
            })
            .catch(err => Promise.reject(err))
    }),

    body('password').not().isEmpty().escape().trim().isLength({ min: 8 }),
    body('confirm_password').not().isEmpty().escape().trim().custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error('Password confirmation does not match password')
        }
        return true
    })
]

exports.login = [
    body('username').not().isEmpty().escape().trim().custom((value, { req }) => {
        return User.findOne({ username: value }).exec()
            .then(user => {
                if (!user) {
                    return Promise.reject('username not found')
                }
                return bcrypt.compare(req.body.password, user.password)
            })
            .then(result => {
                if (!result) {
                    return Promise.reject('invalid password')
                }
            })
            .catch(err => Promise.reject(err))
    }),
    body('password').not().isEmpty().escape()
]

