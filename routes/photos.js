const express = require('express')
const router = express.Router()

const appController = require('../controllers/appController')
const authenticate = require('../lib/middleware/auth')

router.get('/add', authenticate, appController.index)
router.get('/view/:photoId', authenticate, appController.index)

module.exports = router
