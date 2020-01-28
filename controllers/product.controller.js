var Product = require("../models/product.model");

async function getAllProducts (req, res, next){
    let products = await Product.findAll();
    res.json(products);
}

async function getSingleProduct(req, res, next){
    try {
        let product = await Product.findByPk(req.params.id);
        if ( !product){
            res.status(404).end();
            return;
        }
        res.json(product);
    } catch (error){
        res.status(500).end();
    }
}

async function createProduct (req, res, next) {
    if (!req.fields){
        res.status(400).end();
        return;
    }
    try {
        let product = await Product.create(req.fields);
        res.json(product);
    } catch (error) {
        console.error(error);
        res.status(400).end();
    }
}

async function deleteProduct (req, res, nex){
    try {
        let result = await Product.destroy({
            where: {
                id: req.params.id
            }
        });
        if (!result){
            res.status(404).end();
            return
        }
        res.status(204).end();
    } catch (error){
        console.error(error);
        res.status(500).end();
    }
}

async function updateProduct(req, res, next){
    try {
        let result = Product.update(req.fields, {
            where: {
                id: req.params.id
            }
        });
        if (!result[0]) {
            res.status(404).end();
            return;
        }
        let product = await Product.findByPk(req.params.id);
        res.json(product);
    } catch (error) {
        console.error(error);
        res.status().end();
        if (error.SequelizeValidationError){
            res.status(400).end();
            return;
        }
        res.status(500).end();
    }
}

module.exports = {
    getAllProducts,
    getSingleProduct,
    createProduct,
    deleteProduct,
    updateProduct
};