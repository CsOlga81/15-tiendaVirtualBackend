const mysql = require('mysql2');

// aquí configuro la conexion con la base de datos
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password:'011203',
    database: 'tienda_virtual',
    port: 3306,
    ssl: false
});

// aquí se verifica si la conexión funciona
connection.connect((err) => {
    if (err) {
        console.error('Error al conectarse con la base de datos: '+ err.stack);
        return;
    }
    console.log('Está conectado con la base de datos con el ID: '+ connection.threadId);
});

module.exports = connection;