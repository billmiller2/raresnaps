const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')

const tagsController = require('../../controllers/tagsController')
const authenticate = require('../../lib/middleware/auth')

router.post('/', authenticate, bodyParser.json(), tagsController.add)

module.exports = router
