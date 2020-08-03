const express = require('express')
const router = express.Router()

const photosController = require('../controllers/photosController')
const authenticate = require('../lib/middleware/auth')

// router.get('/:key', photosController.show)
router.get('/:id', authenticate, photosController.show)
router.get('/', authenticate, photosController.index)

module.exports = router
