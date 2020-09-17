const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')

const tagsController = require('../../controllers/tagsController')
const authenticate = require('../../lib/middleware/auth')
const tagsValidator = require('../../lib/validators/tagsValidator')

router.get('/', authenticate, tagsController.index)
router.post('/', tagsValidator.add, authenticate, bodyParser.json(), tagsController.add)

module.exports = router
