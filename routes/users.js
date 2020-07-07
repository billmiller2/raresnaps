var express = require('express');
var router = express.Router();

var usersController = require('../controllers/usersController')

router.get('/login', usersController.login)

module.exports = router;
