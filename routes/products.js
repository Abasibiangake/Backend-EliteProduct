var express = require('express');
var router = express.Router();

let productController = require('../controllers/product');
let authController = require('../controllers/auth');

//=====================ONLY REGISTERED USERS CAN ACCESS=============================

// Create an ad
router.post('/add', authController.requireAuth, productController.processAddPage);

//Edit
router.post('/edit/:id', authController.requireAuth, authController.isAllowed, productController.processEditPage);

// Delete
router.get('/delete/:id', authController.requireAuth, authController.isAllowed, productController.performDelete);

//===================================================================================

// Acting temporarily as home page------------------------------------
router.get('/list', productController.usedProducts);

module.exports = router;