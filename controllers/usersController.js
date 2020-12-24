const { validationResult } = require('express-validator')
const { Group } = require('../models/group.js')
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

    Group.findOne({ name: req.body.group.toLowerCase() }, (err, group) => {
        if (!group) {
            return res.status(422).render('createUser.pug', {
                title: 'raresnaps login',
                errors: [{ msg: 'Invalid Group' }]
            })
        } else {
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                if (err) {
                    next(err)
                }

                const user = new User({
                    username: req.body.username,
                    usernameLowercase: req.body.username.toLowerCase(),
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
    }

    Group.findOne({ name: req.body.group.toLowerCase() }, (err, group) => {
        if (!group) {
            return res.status(422).render('login.pug', {
                title: 'raresnaps login',
                errors: [{ msg: 'Invalid Group' }]
            })
        } else {
            User.findOne({ usernameLowercase: req.body.username.toLowerCase() }, (err, user) => {
                if (err) {
                    return next(err)
                }

                const payload = { username: user.username }
                const options = { expiresIn: '1d' }
                const token = jwt.sign(payload, process.env.JWT_SECRET, options, (err, token) => {
                    if (err) {
                        next(err)
                    }

                    res.cookie('token', token)
                    res.redirect(303, '/')
                })
            })
        }
    })
}

exports.logout = (req, res, next) => {
    res.clearCookie('token')
    res.redirect(303, '/users/login')
}

exports.user = (req, res, next) => {
    const token = req.cookies.token

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            res.redirect('/users/login')
        }

        res.send(200, decoded)
    })
}
