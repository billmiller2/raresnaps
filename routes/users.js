const express = require('express')
const router = express.Router()

const usersController = require('../controllers/usersController')
const usersValidator = require('../lib/validators/usersValidator')

router.get('/login', usersController.login)
router.get('/create', usersController.createUserForm)
router.post('/create', usersValidator.create, usersController.create)

module.exports = router

