const mysql = require('mysql2');

// aquí configuro la conexion con la base de datos
const pool = mysql.createPool({  // con createPool varios clientes podran comprar al mismo tiempo
    host: 'localhost',
    user: 'root',
    password:'011203',
    database: 'tienda_virtual',
    port: 3306,
    ssl: false
});

// usare .getConnection para pedir al pool qeu me preste una de sus conexiones disponibles
pool.getConnection((err, conn) => {
    if (err) {
        console.error('Error al obtener una conexión del pool: '+ err.stack);
        return;
    }
    console.log('Está conectado al pool con el ID: '+ conn.threadId);
    conn.release();  //Devolvemos la conexión al Pool para que la use otro proceso
});

module.exports = pool;