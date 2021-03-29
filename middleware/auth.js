const jwt = require('jsonwebtoken')
const url = require('url')

module.exports = (req, res, next) => {
    const token = req.cookies.token
    const redirect = url.format({
        pathname: '/users/login',
        query: req.query
    })

    if (!token) {
        res.redirect(redirect)
    } else {
        jwt.verify(token, process.env.JWT_SECRET, (err) => {
            if (err) {
                res.redirect(redirect)
            } 
        })

        next()
    }
}
