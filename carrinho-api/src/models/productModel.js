const conn = require('./conn');

const getAll = async (id) => {

    const [product] = await conn.execute('SELECT * FROM jdcarrinho WHERE id_cliente = ?', [id]);
    
    return product;
};

const createProduct = async (product) => {

    const { id_prod, produto, descricao , preco, estoque, id_cliente} = product;

    const query = `INSERT INTO jdcarrinho (id_prod, nome, descricao, punit, qt_prod, id_cliente) VALUES (?, ?, ?, ?, ?, ?)`

    const [createdProduct] = await conn.execute(query, [id_prod, produto, descricao, preco, estoque, id_cliente]);

    return {insertiId: createdProduct.insertId};
}

const deleteProduct = async (id, id_cliente) => {
    
    const removedProduct = await conn.execute('DELETE FROM jdcarrinho WHERE id_prod = ? and id_cliente = ?', [id, id_cliente]);

    return removedProduct;
};

const updateProduct = async (id, product) => {
    
    const {produto, descricao, preco, estoque, id_cliente} = product;
    
    const query = 'Update jdcarrinho set nome = ?, descricao = ?, punit = ?, qt_prod = ? WHERE id_prod = ? and id_cliente = ?';

    const updatedProduct = await conn.execute(query, [produto, descricao, preco, estoque, id, id_cliente]);

    return updatedProduct;
};

module.exports = {
    getAll,
    createProduct,
    deleteProduct,
    updateProduct
};