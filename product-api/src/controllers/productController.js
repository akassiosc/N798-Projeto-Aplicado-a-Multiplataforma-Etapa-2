const productModel = require('../models/productModel');

const getAll = async (req, res) => {

    const { categoria } = req.params;

    const product = await productModel.getAll(categoria);

    return res.status(200).json(product)
}

const createProduct = async (req, res) => {

    const createdProduct = await productModel.createProduct(req.body);

    return res.status(201).json(createdProduct);

};

const deleteProduct = async(req, res) => {

    const { id } = req.params;

    await productModel.deleteProduct(id);

    return res.status(204).json({ message: 'Product deleted successfully' });
};

const updateProduct = async(req, res) => {
   
    const { id } = req.params;

    await productModel.updateProduct(id, req.body);

    return res.status(204).json({ message: 'Product updated successfully' });
};

module.exports = {
    getAll,
    createProduct,
    deleteProduct,
    updateProduct
};