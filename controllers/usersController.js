//exports.create = (req, res) => res.render('users/createUser.pug', { title: 'create user' })
exports.create = (req, res) => res.render('createUser.pug', { title: 'create user' })
exports.login = (req, res) => res.send('login')

