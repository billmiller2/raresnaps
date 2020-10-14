const express = require('express')
const router = express.Router()

const usersController = require('../../controllers/usersController')
const authenticate = require('../../middleware/auth')

router.get('/user', authenticate, usersController.user)

module.exports = router
