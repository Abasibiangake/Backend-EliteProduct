let Products=require('../models/product')

exports.home = function (req, res, next) {
    // console.log('===> Original URL: ' + req.session.url);
    // res.render('products/list', { 
    //     title: 'Latest Ads',
    //     userName: req.user ? req.user.username : ''
    // });
    res.redirect('products/list');
};

exports.clothingPage = async (req, res, next) =>{
    try {

        const products = await Products.find()
        console.log(products)
          res.render('categories/clothing', {
                 title: "Clothing Category",
                 list:products
      });
    } catch (e) {
        console.log(`getting error ${e}`)
         res.end(e);
    }  
};

exports.vehiclePage = async (req, res, next) =>{
    try {

        const products = await Products.find()
        console.log(products)
          res.render('categories/vehicle', {
                 title: "Vehicle Category",
                 list:products
      });
    } catch (e) {
        console.log(`getting error ${e}`)
         res.end(e);
    }
};  

exports.electronicsPage = async (req, res, next) =>{
    try {

        const products = await Products.find()
        console.log(products)
          res.render('categories/electronics', {
                 title: "Electronic Category",
                 list:products
      });
    } catch (e) {
        console.log(`getting error ${e}`)
         res.end(e);
    }
};  

exports.furniturePage = async (req, res, next) =>{
    try {

        const products = await Products.find()
        console.log(products)
          res.render('categories/furniture', {
                 title: "Furniture Category",
                 list:products
      });
    } catch (e) {
        console.log(`getting error ${e}`)
         res.end(e);
    }
};  

exports.outdoorPage = async (req, res, next) =>{
    try {

        const products = await Products.find()
        console.log(products)
          res.render('categories/outdoor', {
                 title: "Outdoor Category",
                 list:products
      });
    } catch (e) {
        console.log(`getting error ${e}`)
         res.end(e);
    }
}; 