const express = require('express');

const router = express.Router();

const controller = require('./controllers/clientController');
const middleware = require('./middlewares/clientMiddleware')

router.post('/cliente/login', controller.getAll);
router.post('/cliente', controller.createClient);
router.delete('/cliente/:id', middleware.validateToken, controller.deleteClient);
router.put('/cliente/:id', middleware.validateToken, controller.updateClient);

module.exports = router;