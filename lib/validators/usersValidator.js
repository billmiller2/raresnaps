const { body } = require('express-validator')

const createUserValidator = [
    body('username').not().isEmpty().escape().trim(),
    body('password').not().isEmpty().escape().trim(),
    body('confirm_password').not().isEmpty().escape().trim().custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error('Password confirmation does not match password')
        }
        return true
    })
]

exports.create = createUserValidator

