const express = require('express');  //Busca la libreria Express que se instalo para usarla aquí
const errorHandler = require('./middlewares/errorHandler');  //Con esto traemos el traductor de los errores
const app = express();  //Se guarda en la constante app todas las herramientas para crear rutas, recibir pedidos y enviar respuestas

app.use(express.json()); // Esta linea de código es para entender datos en formato JSON se usa con el post(crear)
const port = 3000;

//Cree una base de datos para probar los endpoints
let producto = [
    { id: 1, nombre: "Crema corporal", genero: "Mujer", precio: 40000, cantidad: 10 },
    { id: 2, nombre: "Perfume Dorsay", genero: "Hombre", precio: 65000, cantidad: 5 },
    { id: 3, nombre: "Cadena con aretes", genero: "Mujer", precio: 70000, cantidad: 2 }
];

app.get('/', (req, res) => {
    res.send('Bienvenidos a la Tienda Virtual, el servidor está funcionando');
});

//Esta es la ruta para ver todo el listado de productos
app.get('/productos', (req, res) => {
    res.json(producto);
});

//Ruta donde el cliente pide ver un solo producto de la lista temporal que cree
app.get('/productos/:id', (req, res, next) => {

    //Se captura el ID de la url
    const idUrl = req.params.id;

    // se busca el producto en el arreglo
    const productoEncontrado = producto.find(p => p.id.toString() === idUrl);

    //Si no existe, se crea el error y se va al middleware
    if (!productoEncontrado) {
        const error = new Error("Ese ID no existe en la Base de datos");
        error.status = 404;
        return next(error);  //Se envia al errorHandler.js
    }
    // respuesta si existe el ID
    res.json(productoEncontrado);  
});

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

//Esta ruta es para actualizar un producto existente
app.put('/productos/:id', (req, res, next) => {
    const idUrl = req.params.id;

    //Aqui busca la posición del producto y lo combierte en String para que sea igual a de la Url
    const indice = producto.findIndex(p => p.id.toString() === idUrl);

    if (indice === -1) {
        const error = new Error("No existe el producto");
        error.status = 404;
        return next(error);
    }

    //Mezclamos el producto antiguo con el actualizado
    producto[indice] = {
        ...producto[indice],
        ...req.body
    };

    res.json({
        mensaje: "Producto Actualizado con Exito",
        producto: producto[indice]
    })
});

//Aqui la ruta para eliminar un producto
app.delete('/productos/:id', (req, res, next) => {
    const idUrl = req.params.id; //con esta linea se extrae el id que se escribio en la url y se guarda

    //aqui se esta buscando el producto con indice
    const indice = producto.findIndex(p => p.id.toString() === idUrl);

    if (indice === -1) {
        const  error =  new Error("No se encontró el producto");
        error.status = 404;
        return next(error);
    } 
    
    //Aqui ya eliminamos el producto 
    const eliminado = producto.splice(indice, 1);
    res.json({
        mensaje: "El producto fue eliminado con exito",
        productoBorrado: eliminado[0]
    });
});

app.use(errorHandler);  // con este usamos el archivo externo de manejo de errores para atrapar el error

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});