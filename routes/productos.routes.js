const express = require('express');
const router = express.Router();

const productoController = require('../controllers/productos.controller'); //Importe el controlador 

//La ruta para ver los productos
router.get('/', productoController.obtenerProductos);

//Ruta para crear un nuevo pruducto
router.post('/', productoController.crearProducto);

//Esta ruta es para actualizar un producto existente
router.put('/:id', productoController.actualizarProducto);

//Aqui la ruta para eliminar un producto
router.delete('/:id', productoController.eliminarProducto );


module.exports = router;  //Exportar