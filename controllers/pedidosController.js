const db = require('../config/db');   // se usa ../ para salir de la carpeta controllers y entrar a config


const crearPedido = async (req, res) => {
    //Aquí se reciben los datos JSON
    const { id_cliente, productos } = req.body;

    try { //todo lo que escribo dentro está protegido
    
        console.log("Recibiendo pedido para el cliente :", id_cliente); //se verifica en la consola si llegaron bien los datos
        console.log("La lista de productos recibida es: ", productos);

        res.json({
            mensaje: "Datos recibidos en el servidor",
            cliente: id_cliente,
            cantidad_productos: productos.length
        });

    }catch (error) {
        // si algo falla arriba, se viene aquí
        console.error("Error detectado:", error.message); 
        res.status(500).json({ error: "Ocurrió un error en el servidor" });
    }
};

module.exports = { crearPedido};