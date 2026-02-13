const express = require('express');  //Busca la libreria Express que se instalo para usarla aquí
const app = express();  //Se guarda en la constante app todas las herramientas para crear rutas, recibir pedidos y enviar respuestas
const port = 3000;

app.get('/', (req, res) => {
    res.send('Bienvenidos a la Tienda Virtual, el servidor está funcionando');
});

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});