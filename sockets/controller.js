const TicketControl = require('../models/ticket-control');

const ticketControl = new TicketControl();

const socketController = (socket) => {
    socket.emit('utimo-ticket', ticketControl.ultimo);
    socket.emit('estado-actual', ticketControl.ultimos4);
    socket.emit('tickets-pendientes', ticketControl.tickets.length);

    socket.on('disconnect', () => {});

    socket.on('siguiente-ticket', (payload, callback) => {
        const siguiente = ticketControl.siguiente();
        socket.broadcast.emit('tickets-pendientes', ticketControl.tickets.length);
        callback(siguiente);

        //add ticket pendiente de asignar
    });

    socket.on('atender-ticket', ({ escritorio }, callback) => {
        if (!escritorio) {
            return callback({
                ok: false,
                msg: 'El escritorio es obligatorio'
            });
        }
        const ticket = ticketControl.atenderTicket(escritorio);
        //actualizo los ultimos 4
        socket.broadcast.emit('estado-actual', ticketControl.ultimos4);
        //actualizo la cola de tickets 
        socket.emit('tickets-pendientes', ticketControl.tickets.length);
        socket.broadcast.emit('tickets-pendientes', ticketControl.tickets.length);


        if (!ticket) {
            callback({
                ok: false,
                msg: 'No hay tickets para atender'
            });
        } else {
            callback({
                ok: true,
                ticket
            });
        }
    });
};


module.exports = {
    socketController
};