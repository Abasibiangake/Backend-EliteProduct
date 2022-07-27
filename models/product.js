// Import
let mongoose = require('mongoose');

// Create a model class
let productModel = mongoose.Schema(
    {
        image      :String,
        category      :String,
        condition     :String,
        title         :String,
        description   :String,
        price         :Number,
        phoneNumber   :Number

    }, 
    {
        collection: "products"
    });

module.exports = mongoose.model("products", productModel);
