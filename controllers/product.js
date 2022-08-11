// create a reference to the model
let ProductModel = require('../models/product');

function getErrorMessage(err) {    
    if (err.errors) {
        for (let errName in err.errors) {
            if (err.errors[errName].message) return err.errors[errName].message;
        }
    } 
    if (err.message) {
        return err.message;
    } else {
        return 'Unknown server error';
    }
};

// Gets all products from the Database and renders the page to list them all.
module.exports.usedProducts = async function(req, res, next) {  

    try {
        let usedProducts = await ProductModel.find().populate({
            path: 'owner',
            select: 'firstName lastName email username admin created'
        });

        return res.status(200).json(usedProducts);
        
    } catch (error) {
        return res.status(400).json(
            { 
                success: false, 
                message: getErrorMessage(error)
            }
        );
    }


}

// Processes the data submitted from the Add form
module.exports.processAddPage = (req, res, next) => {
    try {
        let newItem = ProductModel({
            id: req.body.id,
            image: req.body.image,
            category: req.body.category,
            condition: req.body.condition,
            title: req.body.title,
            description: req.body.description,
            price: req.body.price,
            phoneNumber: req.body.phoneNumber,
            owner: (req.body.owner == null || req.body.owner == "")? req.payload.id : req.body.owner

        });

        ProductModel.create(newItem, (err, item) =>{
            if(err)
            {
                console.log(err);
                return res.status(400).json(
                    { 
                        success: false, 
                        message: getErrorMessage(err)
                    }
                );
            }
            else
            {
                //CAN ADD if --> in case item already exists...
                console.log(item);
                res.status(200).json(item);
            }
        });
    } catch (error) {
        return res.status(400).json(
            { 
                success: false, 
                message: getErrorMessage(error)
            }
        );
    }
}


// Processes the data submitted from the Edit form to update a product
module.exports.processEditPage = (req, res, next) => {

    try {
        let id = req.params.id

        let updatedProduct = ProductModel({
            id: req.body.id,
            image: req.body.image,
            category: req.body.category,
            condition: req.body.condition,
            title: req.body.title,
            description: req.body.description,
            price: req.body.price,
            phoneNumber: req.body.phoneNumber,
            owner: (req.body.owner == null || req.body.owner == "")? req.payload.id : req.body.owner
        });

        ProductModel.updateOne({id: id}, updatedProduct, (err) => {
            if(err)
            {
                console.log(err);
                return res.status(400).json(
                    { 
                        success: false, 
                        message: getErrorMessage(err)
                    }
                );
            }
            else
            {
                res.status(200).json(
                    {
                        success: true,
                        message: 'Item updated successfully.'
                    }
                    )
                }
            });
        } catch (error) {
            return res.status(400).json(
                { 
                    success: false, 
                    message: getErrorMessage(error)
                }
            );
        }
    }

// Deletes a product based on its id.
module.exports.performDelete = (req, res, next) => {

    try {
        let id = req.params.id;

        ProductModel.remove({id: id}, (err) => {
            if(err)
            {
                console.log(err);
                return res.status(400).json(
                    { 
                        success: false, 
                        message: getErrorMessage(err)
                    }
                );
            }
            else
            {
                res.status(200).json(
                    {
                        success: true,
                        message: 'Item deleted successfully.'
                    }
                )
            }
        });
    } catch (error) {
        return res.status(400).json(
            { 
                success: false, 
                message: getErrorMessage(error)
            }
        );
    }
}