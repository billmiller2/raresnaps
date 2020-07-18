var express = require('express');
var router = express.Router();

const appController = require('../controllers/appController')
const authenticate = require('../lib/middleware/auth')

router.get('/', authenticate, appController.index)

module.exports = router;
