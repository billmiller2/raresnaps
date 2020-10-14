const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')

const tagsController = require('../../controllers/tagsController')
const authenticate = require('../../middleware/auth')
const tagsValidator = require('../../middleware/validators/tagsValidator')

router.get('/', authenticate, tagsController.index)
router.get('/search/:name', authenticate, bodyParser.json(), tagsController.search)
router.post('/', tagsValidator.add, authenticate, bodyParser.json(), tagsController.add)

module.exports = router
