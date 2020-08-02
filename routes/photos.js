const express = require('express')
const router = express.Router()

const photosController = require('../controllers/photosController')
const authenticate = require('../lib/middleware/auth')

// router.get('/:key', photosController.show)
router.get('/', photosController.show)

module.exports = router
