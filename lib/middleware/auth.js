module.exports = (req, res, next) => {
    const token = req.cookies.token

    if (!token) {
        res.redirect('/users/login')
    }

    next()
}
