let express = require('express');
let router = express.Router();
let usersController = require('../controllers/user');
let authController = require('../controllers/auth');

router.get('/me', authController.requireAuth, usersController.myprofile);

// REGISTER
router.post('/register', usersController.register);

// SIGN-IN
router.post('/signin', usersController.signin);


module.exports = router;