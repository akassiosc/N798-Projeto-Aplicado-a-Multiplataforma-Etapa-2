const express = require('express');

const router = express.Router();

const controller = require('./controllers/productController');
const middleware = require('./middlewares/productMiddleware')

router.get('/product/:categoria', controller.getAll);
router.post('/product', middleware.validateToken, middleware.validateBody, controller.createProduct);
router.delete('/product/:id', middleware.validateToken, controller.deleteProduct);
router.put('/product/:id', middleware.validateToken, middleware.validateBody, controller.updateProduct);

module.exports = router;