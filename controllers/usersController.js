const { validationResult } = require('express-validator')
const { User } = require('../models/user.js')

exports.createUserForm = (req, res) => res.render('createUser.pug', { title: 'create user' })

exports.create = (req, res) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        res.render('createUser.pug', { 
            title: 'create user',
            errors: errors.array()
        })
    } else {
        const user = new User({
            username: req.body.username,
            password: req.body.password
        })
        user.save((err) => {
            // handle err

            req.session.sessionFlash = {
                type: 'success',
                message: 'User Created'
            }

            res.redirect(301, '/users/login')
        })
    }
}

exports.login = (req, res) => res.render('login.pug', { title: 'raresnaps login' })

