const conn = require('./conn');

const getAll = async () => {

    const [order] = await conn.execute('SELECT * FROM jdpedido where dt_cancel is null');
    
    return order;
};

const createOrder = async (order) => {

    const [{ id_prod, qt_prod, id_cob, id_cliente, subtotal, vl_desc, vl_total, qt_parcelas }] = order;
    console.log(order);
    const query = `INSERT INTO jdpedido (id_prod, qt_prod, id_cob, id_cliente, subtotal, vl_desc, vl_total, qt_parcelas) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`

    const [createdOrder] = await conn.execute(query, [id_prod, qt_prod, id_cob, id_cliente, subtotal, vl_desc, vl_total, qt_parcelas]);

    return {insertId: createdOrder.insertId};
}

const deleteOrder = async (id) => {
    
    const removedOrder = await conn.execute('UPDATE jdpedido set status = 0, dt_cancel = sysdate()  WHERE id_pedido = ?', [id]);

    return removedOrder;
};

const updateOrder = async (id, order) => {
    
    const {subtotal, vl_desc, vl_total, qt_prod, vl_pago, status, dt_entrega} = order;
    
    const query = 'Update jdpedido set subtotal = ?, vl_desc = ?, vl_total = ?, qt_prod = ?, vl_pago = ?, status = ?, dt_entrega = ? WHERE id_pedido = ?';

    const updatedOrder = await conn.execute(query, [subtotal, vl_desc, vl_total, qt_prod, vl_pago, status, dt_entrega, id]);

    return updatedOrder;
};

module.exports = {
    getAll,
    createOrder,
    deleteOrder,
    updateOrder
};