const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')

const commentsController = require('../../controllers/commentsController')
const authenticate = require('../../lib/middleware/auth')
const commentsValidator = require('../../lib/validators/commentsValidator')

router.get('/', authenticate, commentsController.index)
router.post('/', commentsValidator.add, authenticate, bodyParser.json(), commentsController.add)

module.exports = router
