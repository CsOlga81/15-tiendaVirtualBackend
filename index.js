const express = require('express');  //Busca la libreria Express que se instalo para usarla aquí
const errorHandler = require('./middlewares/errorHandler');  //Con esto traemos el traductor de los errores
const productosRoutes = require('./routes/productosRoutes'); // conectamos las rutas
const pedidosRoutes = require('./routes/pedidosRoutes');

const app = express();  //Se guarda en la constante app todas las herramientas para crear rutas, recibir pedidos y enviar respuestas
app.use(express.json()); // Esta linea de código es para entender datos en formato JSON se usa con el post(crear)
const port = 3000;

app.get('/', (req, res) => {
    res.send('Bienvenidos a la Tienda Virtual, el servidor está funcionando');
});
app.use('/productos', productosRoutes);  // aqui conectamos el modulo routes de productos

app.use('/pedidos', pedidosRoutes); 

app.use(errorHandler);  // con este usamos el archivo externo de manejo de errores para atrapar el error

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});