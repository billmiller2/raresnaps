var express = require('express');
var router = express.Router();

var usersController = require('../controllers/usersController')

router.get('/login', usersController.login)
router.get('/create', usersController.create)

module.exports = router;
