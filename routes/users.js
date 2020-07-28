const express = require('express')
const router = express.Router()

const usersController = require('../controllers/usersController')
const usersValidator = require('../lib/validators/usersValidator')

router.get('/login', usersController.loginForm)
router.post('/login', usersValidator.login,  usersController.login)

router.get('/logout', usersController.logout)

router.get('/create', usersController.createUserForm)
router.post('/create', usersValidator.create, usersController.create)

module.exports = router
