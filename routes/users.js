let express = require('express');
let router = express.Router();
let usersController = require('../controllers/user');
let passport = require('passport');

// ----------------------------------------------------------------
// USER MUST BE ABLE TO REGISTER, LOGIN, LOGOUT, MODIFY
// ----------------------------------------------------------------



// REGISTER
router.get('/register', usersController.renderRegistrationPage);//render
router.post('/register', usersController.register);//process

// SIGN-IN
router.get('/signin', usersController.renderSignin);//render
router.post('/signin', usersController.signin);//process

// SIGN-OUT
router.get('/signout', usersController.signout);//render


//UPDATE/MODIFY
// router.get('/update/:id', requireAuth, usersController.renderUpdatePage);//render
// router.post('/update/:id', requireAuth, usersController.update);//process


module.exports = router;