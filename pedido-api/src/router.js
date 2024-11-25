const express = require('express');

const router = express.Router();

const controller = require('./controllers/orderController');
const middleware = require('./middlewares/orderMiddleware')

router.get('/pedido', controller.getAll);
router.post('/pedido', middleware.validateToken, controller.createOrder);
router.delete('/pedido/:id', middleware.validateToken, controller.deleteOrder);
router.put('/pedido/:id', middleware.validateToken, controller.updateOrder);

module.exports = router;