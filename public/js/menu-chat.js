// ================= SOCKET =================
const socket = io();

socket.on("connect", () => {
  console.log("✅ Socket conectado:", socket.id);
});

// ================= DOM (REFERENCIAS) =================
const badge = document.getElementById("chatBadge");
const mensajesDiv = document.getElementById("mensajesChat");
const chatOffcanvas = document.getElementById("chatOffcanvas");
const input = document.getElementById("mensajeInput");
const btnEnviar = document.getElementById("btnEnviarMensaje");

let mensajesNoLeidos = 0;

// ================= RECIBIR MENSAJES =================
socket.on("mensaje", (data) => {
  const p = document.createElement("p");
  p.innerHTML = `<strong>${data.usuario}:</strong> ${data.texto}`;
  mensajesDiv.appendChild(p);
  mensajesDiv.scrollTop = mensajesDiv.scrollHeight;

  const abierto = chatOffcanvas.classList.contains("show");

  if (!abierto) {
    mensajesNoLeidos++;
    badge.textContent = mensajesNoLeidos;
    badge.classList.remove("d-none");

    mostrarNotificacion(data.usuario, data.texto);
  }
});

// ================= ENVIAR MENSAJES =================
function enviarMensaje() {
  const texto = input.value.trim();
  if (!texto) return;

  socket.emit("mensaje", { texto });
  input.value = "";
}

// CLICK EN BOTÓN
btnEnviar.addEventListener("click", enviarMensaje);

// ENTER EN INPUT 
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    enviarMensaje();
  }
});

// ================= LIMPIAR BADGE AL ABRIR =================
chatOffcanvas.addEventListener("shown.bs.offcanvas", () => {
  mensajesNoLeidos = 0;
  badge.classList.add("d-none");
});

// ================= TOAST =================
function mostrarNotificacion(usuario, mensaje) {
  const toastEl = document.getElementById("chatToast");
  const toastBody = document.getElementById("toastBody");

  if (!toastEl || !toastBody) return;

  toastBody.textContent = `${usuario}: ${mensaje}`;
  const toast = new bootstrap.Toast(toastEl);
  toast.show();
}