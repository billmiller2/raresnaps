const express = require('express')
const router = express.Router()

const appController = require('../controllers/appController')
const authenticate = require('../middleware/auth')

router.get('/', authenticate, appController.index)

module.exports = router
