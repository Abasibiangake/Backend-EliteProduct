var express = require('express');
var router = express.Router();

let productController = require('../controllers/product');

function requireAuth(req, res, next)
{
    // check if the user is logged in  <------------------------------------
    if(!req.isAuthenticated()){
        req.session.url=req.originalUrl;
        return res.redirect('/users/signin');
    }
    next();  
}

// Acting temporarily as home page------------------------------------
router.get('/list', productController.usedProducts);


// Create an ad page
router.get('/add', productController.displayAddPage);
router.post('/add', productController.processAddPage);

//Routers for edit
router.get('/edit/:id', productController.displayEditPage);
router.post('/edit/:id', productController.processEditPage);

// Delete
router.get('/delete/:id', productController.performDelete);

// router.get('/delete/:id', requireAuth, productController.performDelete);



module.exports = router;