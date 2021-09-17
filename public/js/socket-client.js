//referencias del HTML 
const lblOnline = document.querySelector('#lblOnline');
const lblOffline = document.querySelector('#lblOffline');
const txtMensaje = document.querySelector('#txtMensaje');
const btnEnviar = document.querySelector('#btnEnviar');



const socket = io();

//oyente listener
socket.on('connect', () => {
    console.log(`Conectado al Servidor`);
    lblOffline.style.display = 'none';
    lblOnline.style.display = '';
});

socket.on('disconnect', () => {
    console.log(`Desconectado del Servidor`);
    lblOffline.style.display = '';
    lblOnline.style.display = 'none';
});

socket.on('enviar-mensaje', (payload) => {
    console.log(payload);
});

//event listener 

btnEnviar.addEventListener('click', () => {
    const mensaje = txtMensaje.value;
    const payload = {
            mensaje,
            id: '123abc',
            feacha: new Date().getTime()
        }
        //enviar al servidor
        //id es la respuesta del servidor si OK o no
        //nombres de los eventos sin mayusculos ni caractares especiales 
    socket.emit('enviar-mensaje', payload, (id) => {
        console.log('Respuesta del server ', id);
    });
});