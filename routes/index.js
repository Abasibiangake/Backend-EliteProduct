
let controllerIndex = require('../controllers/index');

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', homePage);
router.get('/categories/clothing', controllerIndex.clothingPage);
router.get('/categories/vehicle', controllerIndex.vehiclePage); 
router.get('/categories/electronics', controllerIndex.electronicsPage);
router.get('/categories/furniture', controllerIndex.furniturePage);
router.get('/categories/outdoor', controllerIndex.outdoorPage);


//controller
function homePage (req, res, next) {
    res.render('products/list', {title: "Latest Ads"});
  }

module.exports = router;