const socketController = (socket) => {
    console.log(`cliente conectado ID:${socket.id}`);

    socket.on('disconnect', () => {
        console.log(`cliente desconectado ID:${socket.id}`);
    });

    //configuro los eventos de escucha el servidor que envia el cliente
    socket.on('enviar-mensaje', (payload, callback) => {

        //respodo el cliente el recibido 
        const id = 123456;
        callback(id);

        //es el mismo evento pero Servidor-Clientes(todos) 
        socket.broadcast.emit('enviar-mensaje', payload)
    });
};


module.exports = {
    socketController
};