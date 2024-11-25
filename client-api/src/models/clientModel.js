const conn = require('./conn');
require('dotenv').config();

const getAll = async (id) => {

    const {email, senha} = id;

    const [client] = await conn.execute('SELECT * FROM jdcliente WHERE email = ? and senha = ?', [email, senha]);

    token = process.env.TOKEN;
    
    return {client, token : token};
};

const createClient = async (client) => {

    const { cliente, email, senha, dt_cadastro} = client;

    const query = `INSERT INTO jdcliente (cliente, email, senha, dt_cadastro) VALUES (?, ?, ?, ?)`

    const [createdClient] = await conn.execute(query, [cliente, email, senha, dt_cadastro]);

    return {insertiId: createdClient.insertId, token : process.env.TOKEN};
}

const deleteClient = async (id) => {
    
    const removedClient = await conn.execute('DELETE FROM jdcliente WHERE id_cliente = ?', [id]);

    return removedClient;
};

const updateClient = async (id, client) => {
    
    const {cliente, email, senha} = client;
    
    const query = 'Update jdcliente set cliente = ?, email = ?, senha = ?  WHERE id_cliente = ?';

    const updatedClient = await conn.execute(query, [cliente, email, senha, id]);

    return updatedClient;
};

module.exports = {
    getAll,
    createClient,
    deleteClient,
    updateClient
};