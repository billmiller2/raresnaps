exports.index = (req, res) => {
    const token = req.cookies.token

    if (token) {
        res.render('index.pug')
    } else {
        res.redirect(301, '/users/login')
    }
}
