const express = require('express')
const router = express.Router()
const multer = require('multer')
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

const photosController = require('../../controllers/photosController')
const authenticate = require('../../lib/middleware/auth')

router.get('/:id', authenticate, photosController.show)
router.get('/', authenticate, photosController.index)

router.post('/add', authenticate, upload.single('photo'), photosController.add)

module.exports = router
