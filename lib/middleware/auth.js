const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    const token = req.cookies.token

    if (!token) {
        res.redirect('/users/login')
    }

    jwt.verify(token, process.env.JWT_SECRET, (err) => {
        if (err) {
            res.redirect('/users/login')
        }
    })

    next()
}
