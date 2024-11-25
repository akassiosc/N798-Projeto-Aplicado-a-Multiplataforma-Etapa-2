const conn = require('./conn');

const getAll = async (categoria) => {

    const [product] = await conn.execute('SELECT * FROM jdproduto where categoria = ?', [categoria]);
    
    return product;
};

const createProduct = async (product) => {

    const { produto, descricao, categoria , preco, estoque, medida } = product;

    console.log(product);

    const query = `INSERT INTO jdproduto (nome, descricao, categoria, punit, estoque, est_disp, est_vendido, medida) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`

    const [createdProduct] = await conn.execute(query, [produto, descricao, categoria, preco, estoque, estoque, 0, medida]);

    return {insertiId: createdProduct.insertId};
}

const deleteProduct = async (id) => {
    
    const removedProduct = await conn.execute('DELETE FROM jdproduto WHERE id_prod = ?', [id]);

    return removedProduct;
};

const updateProduct = async (id, product) => {
    
    const {produto, descricao, categoria, preco, estoque, medida, status} = product;
    
    const query = 'Update jdproduto set nome = ?, descricao = ?, categoria = ?, punit = ?, estoque = ?, est_disp = ?, medida = ?, status = ? WHERE id_prod = ?';

    const updatedProduct = await conn.execute(query, [produto, descricao, categoria, preco, estoque, estoque, medida, status, id]);

    return updatedProduct;
};

module.exports = {
    getAll,
    createProduct,
    deleteProduct,
    updateProduct
};