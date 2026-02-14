const express = require('express');  //Busca la libreria Express que se instalo para usarla aquí
const errorHandler = require('./middlewares/errorHandler');  //Con esto traemos el traductor de los errores
const app = express();  //Se guarda en la constante app todas las herramientas para crear rutas, recibir pedidos y enviar respuestas

app.use(express.json()); // Esta linea de código es para entendre datos en formato JSON se usa con el post(crear)
const port = 3000;

//Cree una base de datos temporal o simulada para probar los endpoints
let producto = [
    { id: 1, nombre: "Crema corporal", genero: "Mujer", precio: 40000, cantidad: 10 },
    { id: 2, nombre: "Perfume Dorsay", genero: "Hombre", precio: 65000, cantidad: 5 },
    { id: 3, nombre: "Cadena con aretes", genero: "Mujer", precio: 70000, cantidad: 2 }
];

app.get('/', (req, res) => {
    res.send('Bienvenidos a la Tienda Virtual, el servidor está funcionando');
});

//Ruta donde el cliente pide ver la lista temporal que cree
app.get('/productos', (req, res) => {
    res.json(producto);  //aqui responod con la lista en JSON
})

//Ruta para crear un nuevo pruducto
app.post('/productos', (req, res, next) => {
    const {nombre, genero, precio, cantidad } = req.body;

    //Aqui inicia la alidación revisando si falta algún dato
    if (!nombre || !genero || !precio || !cantidad){
        const error = new Error("Todos los campos son obligatorios");
        error.status = 400;  //Este es el código de error del cliente
        return next(error);   // Aqui se envia el error al archivo errorHandler.js
    }

    //Ahora se crea el nuevo producto si los datos estan completos
    const nuevoProducto = {
        id: producto.length + 1,
        nombre,
        genero,
        precio, 
        cantidad
    };

    producto.push(nuevoProducto);  //Aquí lo empujamos o guardamos en la lista producto
    res.status(201).json(nuevoProducto);   //Asi se responde con el producto creado ye su codigo de esito
});

app.use(errorHandler);  // con este usamos el archivo externo de manejo de errores para atrapar el error

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});