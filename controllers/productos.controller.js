const db = require('../config/db'); //aqui traigo la configuración de la BD. con ../ salgo de controllers y entro a config

//Esta es la función para obtener todos los productos
const obtenerProductos = (req, res) => { // req es lo que el cliente pide. res es lo que responde el servidor
    const sql = "SELECT * FROM producto";  //instruccion SQL donde se le pide a la BD que seleccione todo de la tabla producto

    db.query(sql, (error, resultados) => { // se ejecuta la consulta
        if (error) {
            return req.status(500).json({ error: "Error al consultar la base de datos"});
        }
        res.json(resultados); // si no hubo error se envian los datos al cliente en json
    });
};

const crearProducto = (req, res) =>{
    const{ nombre, descripcion, genero, precio, cantidad, id_categoria } = req.body;

    //valido que los datos lleguen
    if(!nombre || !genero || !precio || !cantidad) {
        return res.status(400).json({ error: "Todos los campos son obligatorios" });
    }
    const sql = "INSERT INTO producto (nombre, descripcion, genero, precio, cantidad, id_categoria) VALUES (?, ?, ?, ?, ?, ?)";

    db.query(sql, [nombre, descripcion, genero, precio, cantidad, id_categoria], (error, resultado) => {
        if (error) {
            console.error("Error en la base de datos:", error); // Este muestra el erro si lo hay
            return res.status(500).json({ error: "Error al crear el producto" });
        }
        res.status(201).json({ 
            mensaje: "Producto creado con éxito",
            id: resultado.insertId });
    });
};

const actualizarProducto = (req, res) => {
    const { id } = req.params; // obtenemos el id dela url
    const { nombre, descripcion, genero, precio,cantidad,id_categoria } = req.body; //aquí se obtienen los nuevos datos del body
    //es la sentencia SQL donde el ID va al final en el WHERE
    const sql = "UPDATE producto SET nombre = ?, descrpcion = ?, genero = ?, precio = ?, cantidad = ?, id_categoria = ? WHERE id_producto = ?";

    db.query(sql, [nombre, descripcion, genero, precio, cantidad, id_categoria, id], (error, resultado) => {
        if (error) {
            console.error("Se presento un error al actualizar", error);
            return res.status(500).json({ mensaje: "Error al acutalizar el producto" });
        }

        //Se verifica si realmente se encontro el producto para actualizar
        if (resultado.affectedRows === 0) {
            return res.status(404).json({mensaje: "Producto no encontrado" });
        }
        res.json({ mensaje: "Producto actualizao con éxito" });
    });
};
//Instruccion o bloque de instrucciones que reuitilizare
const eliminarProducto = (req, res) => {
    const { id } = req.params; // se extrae especificamente el id y se guarda los datos en req.params

    const sql = "DELETE FROM producto WHERE id_productos = ?";

    db.query(sql, [id], (error, resultado) => {
        if (error) {
            console.error("Error al eliminar:", error);
            return res.status(500).json({ error: "Error al intentar eliminar el producto"});
        }
        if (resultado.affectedRows === 0) {
            return res.status(404).json({ mensaje: "El producto no fue encontrado" });
        }
        res.json({ mensaje: "El producto fue eliminado con éxito" });
    });
};
    
module.exports = { obtenerProductos, crearProducto, actualizarProducto, eliminarProducto};