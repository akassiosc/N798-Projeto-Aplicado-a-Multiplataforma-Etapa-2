const clientModel = require('../models/clientModel');

const getAll = async (req, res) => {

    const product = await clientModel.getAll(req.body);

    return res.status(200).json(product)
}

const createClient = async (req, res) => {

    const createdClient = await clientModel.createClient(req.body);

    return res.status(201).json({createdClient});

};

const deleteClient = async(req, res) => {

    const { id } = req.params;

    await clientModel.deleteClient(id);

    return res.status(204).json({ message: 'Client deleted successfully' });
};

const updateClient = async(req, res) => {
   
    const { id } = req.params;

    await clientModel.updateClient(id, req.body);

    return res.status(204).json({ message: 'Client updated successfully' });
};

module.exports = {
    getAll,
    createClient,
    deleteClient,
    updateClient
};