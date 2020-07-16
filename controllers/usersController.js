const { validationResult } = require('express-validator')
const { User } = require('../models/user.js')
const bcrypt = require('bcrypt')

exports.createUserForm = (req, res) => res.render('createUser.pug', { title: 'create user' })

exports.create = (req, res) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        res.render('createUser.pug', {
            title: 'create user',
            errors: errors.array()
        })
    } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
            // handle err

            const user = new User({
                username: req.body.username,
                password: hash
            })

            user.save((err) => {
                // handle err

                req.session.sessionFlash = {
                    type: 'success',
                    message: 'User Created'
                }

                res.redirect(301, '/users/login')
            })
        })
    }
}

exports.loginForm = (req, res) => res.render('login.pug', { title: 'raresnaps login' })

exports.login = (req, res) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        res.render('login.pug', {
            title: 'raresnaps login',
            errors: errors.array()
        })
    } else {
        res.redirect(301, '/users/login')
    }
}
