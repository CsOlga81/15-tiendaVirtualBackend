// Este archivo es solamente para manejar errores
const errorHandler = (err, req, res, next) => {
    console.error(err.stack);  //Este código muestra el error en la terminal
    const status = err.status || 500;
    const mensaje = err. message || 'Error interno del servidor';

    res.status(status).json({
        error: true,
        status: status,
        mensaje: mensaje
    });
};

module.exports = errorHandler;