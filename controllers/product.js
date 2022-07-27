// create a reference to the model
let ProductModel = require('../models/product');

// Gets all products from the Database and renders the page to list them all.
module.exports.usedProducts = function(req, res, next) {  
    //outputs all the documents in the collection in an array
    //has two object - one for error(err) and the other for success(usedProduct)
    ProductModel.find((err, usedProducts) => {
        console.log(usedProducts);
        if(err)
        {
            return console.error(err);
        }
        else
        {
            console.log(usedProducts);
            //send data from atlas db to the webpage
           
            res.render('products/list', {
                title: 'List Of Used Product', 
                ProductList: usedProducts
                
            })            
        }
    });
}

// Renders the Add form using the add_edit.ejs template
module.exports.displayAddPage = (req, res, next) => {
    
    let newItem = ProductModel();

    res.render('products/add_edit', {
        title: 'Create your ad',
        product: newItem
    })        
}

// Processes the data submitted from the Add form
module.exports.processAddPage = (req, res, next) => {

    //REQUEST
    let newItem = ProductModel({
        _id: req.body.id,
        image: req.body.image,
        category: req.body.category,
        condition: req.body.condition,
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        phoneNumber: req.body.phoneNumber
    });

    //RESPOND
    ProductModel.create(newItem, (err, item) =>{
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            //CAN ADD if --> in case item already exists...
            console.log(item);
            res.redirect('/');
        }
    });

}


// Gets a product by id and renders the Edit form using the add_edit.ejs template
module.exports.displayEditPage = (req, res, next) => {
    // ADD YOUR CODE HERE
    let id = req.params.id;

    ProductModel.findById(id, (err, productToEdit) => {
        if (err){
            console.log(err);
            res.end(err);
        }
        else
        {
            //show the edit view
            res.render('products/add_edit', {
                title: 'Edit Product',
                product: productToEdit,
                // userName: req.user ? req.user.username : ''
            })
        }
    });
}

// Processes the data submitted from the Edit form to update a product
module.exports.processEditPage = (req, res, next) => {
    // ADD YOUR CODE HERE
    let id = req.params.id

    //REQUEST
    let updatedProduct = ProductModel({
        _id: req.body.id,
        image: req.body.image,
        category: req.body.category,
        condition: req.body.condition,
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        phoneNumber: req.body.phoneNumber
    });

    ProductModel.updateOne({_id: id}, updatedProduct, (err) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            // console.log(req.body);
            // refresh the book list
            res.redirect('/');
        }
    });
}

// Deletes a product based on its id.
module.exports.performDelete = (req, res, next) => {
    // ADD YOUR CODE HERE
    let id = req.params.id;
    ProductModel.remove({_id: id}, (err) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            // refresh the product list
            res.redirect('/');
        }
    });
}