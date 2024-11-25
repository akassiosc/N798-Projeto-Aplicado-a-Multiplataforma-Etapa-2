const orderModel = require('../models/orderModel');

const getAll = async (req, res) => {

    const order = await orderModel.getAll();

    return res.status(200).json(order)
}

const createOrder = async (req, res) => {

    const createdOrder = await orderModel.createOrder(req.body);

    return res.status(201).json(createdOrder);

};

const deleteOrder = async(req, res) => {

    const { id } = req.params;

    await orderModel.deleteOrder(id);

    return res.status(204).json({ message: 'Order deleted successfully' });
};

const updateOrder = async(req, res) => {
   
    const { id } = req.params;

    await orderModel.updateOrder(id, req.body);

    return res.status(204).json({ message: 'Order updated successfully' });
};

module.exports = {
    getAll,
    createOrder,
    deleteOrder,
    updateOrder
};