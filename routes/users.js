var express = require('express');
var router = express.Router();

const userController = require('../controllers/userController');

router.post('/register', userController.registerUser);
router.post('/create', userController.createUser);
router.post('/login', userController.loginUser);
router.get('/findUser', userController.findUser);

module.exports = router;
