const express = require('express');

const router = express.Router();

const controller = require('./controllers/productController');
const middleware = require('./middlewares/productMiddleware')

router.get('/carrinho/:id', controller.getAll);
router.post('/carrinho', middleware.validateToken, controller.createProduct);
router.delete('/carrinho/:id/:id_cliente', middleware.validateToken, controller.deleteProduct);
router.put('/carrinho/:id', middleware.validateToken, controller.updateProduct);

module.exports = router;