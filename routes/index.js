// var express = require('express');
// var router = express.Router();
let controllerIndex = require('../controllers/index');

// /* GET home page. */
// router.get('/', controllerIndex.home);


// module.exports = router;

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
  
//   function clothingPage (req, res, next) {
//       return res.render('categories/clothing', {
//           title: "Clothing Category"
//       });
//   }
  
  // function vehiclePage (req, res, next) {
  //     res.render('categories/vehicle', {title: "Vehicle Category"});
  // }
  // function electronicsPage (req, res, next) {
  //     res.render('categories/electronics', {title: "Electronic Category"});
  // }
  // function furniturePage (req, res, next) {
  //     res.render('categories/furniture', {title:"Furniture Category"});
  // }

module.exports = router;