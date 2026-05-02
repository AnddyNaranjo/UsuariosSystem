const socket = io();

const form = document.getElementById('chatForm');
const input = document.getElementById('mensaje');
const mensajesDiv = document.getElementById('mensajes');

socket.on('mensaje', (data) => {
  const p = document.createElement('p');
  p.innerHTML = `<strong>${data.usuario}:</strong> ${data.texto}`;
  mensajesDiv.appendChild(p);
  mensajesDiv.scrollTop = mensajesDiv.scrollHeight;
});

form.addEventListener('submit', (e) => {
  e.preventDefault();

  socket.emit('mensaje', {
    texto: input.value
  });

  input.value = '';
});