const { validationResult } = require('express-validator')

exports.createUserForm = (req, res) => res.render('createUser.pug', { title: 'create user' })

exports.create = (req, res) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
    }

    const User = require('../models/user.js')

    const user = new User({
        username: req.body.username,
        password: req.body.password
    })
    user.save((err) => {
        if (err) {
            return next(err)
        }

        res.render('userCreated.pug', { title: 'user created' })
    })
}
exports.login = (req, res) => res.send('login')

