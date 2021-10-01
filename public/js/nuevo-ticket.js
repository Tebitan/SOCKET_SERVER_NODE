// Referencias del HTML
const lblNuevoTicket = document.querySelector('#lblNuevoTicket');
const btnCrearTicket = document.querySelector('#btnCrearTicket');


const socket = io();



socket.on('connect', () => {
    // console.log('Conectado');
    btnCrearTicket.disabled = false;


});

socket.on('disconnect', () => {
    // console.log('Desconectado del servidor');
    btnCrearTicket.disabled = true;

});

socket.on('utimo-ticket', (response) => {
    // console.log('Desconectado del servidor');
    lblNuevoTicket.innerText = "Tcket " + response;

});




btnCrearTicket.addEventListener('click', () => {
    socket.emit('siguiente-ticket', null, (response) => {
        console.log('Desde el server', response);
        lblNuevoTicket.innerText = response;
    });

});