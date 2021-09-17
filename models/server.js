const express = require('express');
const cors = require('cors');
const { socketController } = require('../sockets/controller');



class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        //web socket
        this.server = require('http').createServer(this.app);
        this.io = require('socket.io')(this.server);

        //rutas
        this.paths = {};

        //Middleware
        this.middlewares();

        //Rutas de la Aplicacion 
        this.routes();

        //eventos por socket
        this.sockets();
    }

    middlewares() {
        //CORS
        this.app.use(cors());
        //directorio publico
        this.app.use(express.static('public'));
    };

    routes() {
        //this.app.use(this.paths.auth, require('../routes/auth'));
    };

    sockets() {
        this.io.on("connection", socketController);
    };

    listen() {
        this.server.listen(this.port, () => {
            console.log("Escuchando en el puerto", this.port);
        });
    };
}

module.exports = Server;