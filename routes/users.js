const express = require('express')
const router = express.Router()

const usersController = require('../controllers/usersController')
const usersValidator = require('../middleware/validators/usersValidator')
const authenticate = require('../middleware/auth')

router.get('/login', usersController.loginForm)
router.post('/login', usersValidator.login,  usersController.login)

router.get('/logout', usersController.logout)

router.get('/create', usersController.createUserForm)
router.post('/create', usersValidator.create, usersController.create)

router.get('/user', authenticate, usersController.user)

module.exports = router
