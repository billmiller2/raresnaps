const { validationResult } = require('express-validator')
const { User } = require('../models/user.js')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.createUserForm = (req, res) => res.render('createUser.pug', { title: 'create user' })

exports.create = (req, res, next) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(422).render('createUser.pug', {
            title: 'create user',
            errors: errors.array()
        })
    }

    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
            next(err)
        }

        const user = new User({
            username: req.body.username,
            password: hash
        })

        user.save((err) => {
            if (err) {
                next(err)
            }

            req.session.sessionFlash = [{
                type: 'alert-success',
                message: 'User Created'
            }]

            res.redirect(303, '/users/login')
        })
    })
}

exports.loginForm = (req, res) => res.render('login.pug', { title: 'raresnaps login' })

exports.login = (req, res, next) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(422).render('login.pug', {
            title: 'raresnaps login',
            errors: errors.array()
        })
    } else {
        const payload = { username: req.body.username }
        const options = { expiresIn: 1800 }
        const token = jwt.sign(payload, process.env.JWT_SECRET, options, (err, token) => {
            if (err) {
                next(err)
            }
            req.session.sessionFlash = [{
                type: 'alert-success',
                message: 'logged in'
            }]

            res.cookie('token', token)
            res.redirect(303, '/')
        })
    }
}

exports.logout = (req, res, next) => {
    res.clearCookie('token')
    res.redirect(303, '/users/login')
}
