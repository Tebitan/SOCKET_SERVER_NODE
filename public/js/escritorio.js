//referencias HTML 
const lblEscritorio = document.querySelector('h1');
const btnAtender = document.querySelector('button');
const lblAtender = document.querySelector('small');
const divAlerta = document.querySelector('.alert');
const lblPendientes = document.querySelector('#lblPendientes');
//funciona chrome y firefox
const searchParams = new URLSearchParams(window.location.search);


//valido que existe la propiedad escritorio
if (!searchParams.has('escritorio')) {
    //redirecciono
    window.location = 'index.html';
    throw new Error('El escritorio es Obligatorio');
};

const escritorio = searchParams.get('escritorio');
lblEscritorio.innerText = escritorio;

//ocultamos la alerta 
divAlerta.style.display = 'none';

const socket = io();



socket.on('connect', () => {
    // console.log('Conectado');
    btnAtender.disabled = false;


});

socket.on('disconnect', () => {
    // console.log('Desconectado del servidor');
    btnAtender.disabled = true;

});

socket.on('tickets-pendientes', (response) => {
    if (response === 0) {
        lblPendientes.style.display = "none";

    } else {
        lblPendientes.style.display = "";
        lblPendientes.innerText = response;
    }


});




btnAtender.addEventListener('click', () => {
    socket.emit('atender-ticket', { escritorio }, (response) => {
        const { ok, ticket } = response;
        if (!ok) {
            lblAtender.innerText = 'A nadie';
            return divAlerta.style.display = ''
        }
        lblAtender.innerText = 'Ticket ' + ticket.numero;
    });
});