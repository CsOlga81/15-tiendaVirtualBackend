# Tienda Virtual Backend - Proyecto SENA

Este proyecto toma en cuenta lo visto en el componente formativo "Construcción de API" para realizar el diseño y la codificación de las API´s teniendo en cuenta las características de mi proyecto Tienda Virtual. Fue desarrollado con Node.js y Express para gestionar los productos de la Tienda.

## Tecnologías utilizadas:

* **Node.js**: Es el entorno de ejecución para JavaScript.
* **Express**: Es el Framework para la creación de los servidios web.
* **Middleware**: Es el manejo de los errores 
* **Git/GitHub**: Es para el control de versiones.

## Documentación de Servicios (Endpoints)
| Método | Ruta | Descripción | Código | Errores |
| :---: | :---: | :---: | :---: | :---: |
| GET | '/' | Ruta inicial para el mensaje de bienvenida |
| GET | '/productos' | para mostrar la lista de todos los productos que se crearon como simulación | 200 OK | 500 |
| POST | '/productos' | Se crea un nuevo producto. | 201 Created | 400 |

## Manejo de Errores
Le añadi a la API un middleware centralizado que gestiona los errores, ubicado en `/middleware/errorHandler.js`.
Los codigos utilizados son:
- **400  Bad Request**: Es el que s muestra si falta un campo obligarorio en el POST.
- **500 Internal Server**: Es el error genérico del servidor.

## Cómo ejecutar el proyecto

1. Se clona este repositorio.
2. Se abre la terminal en la carperta del proyecto.
3. Se ejecuta `npm install` para instalar las dependencias (Express).
4. para iniciar el servidor se ejecuta el comando: `node index.js`  y enter
5. Se abre el navegador con el `http://localhosts:3000`