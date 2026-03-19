const express = require('express');
const router = express.Router();
const pedidoController = require('../controllers/pedidosController');

//Se define la ruta para crear un pedido
router.post('/crear', pedidoController.crearPedido);

module.exports = router;