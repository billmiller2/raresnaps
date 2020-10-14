const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')

const commentsController = require('../../controllers/commentsController')
const authenticate = require('../..//middleware/auth')
const commentsValidator = require('../../middleware/validators/commentsValidator')

router.get('/', authenticate, commentsController.index)
router.post('/', commentsValidator.add, authenticate, bodyParser.json(), commentsController.add)

module.exports = router
