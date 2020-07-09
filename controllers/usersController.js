exports.createUserForm = (req, res) => res.render('createUser.pug', { title: 'user created' })
exports.create = (req, res) => res.render('userCreated.pug', { title: 'create user' })
exports.login = (req, res) => res.send('login')

