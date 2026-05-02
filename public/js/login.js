document.addEventListener('DOMContentLoaded', () => {

  const form = document.getElementById('loginForm');

  
form.addEventListener('submit', async (e) => {
  e.preventDefault();

  limpiarErrores();
  ocultarAlerta();

  const usuario = document.getElementById('usuario').value;
  const password = document.getElementById('password').value;

  const res = await fetch('/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ usuario, password })
  });

  const data = await res.json();

  // 🔴 VALIDACIONES
  if (res.status === 400) {
    mostrarErrores(data.errores);
    return;
  }

  // 🔴 LOGIN INCORRECTO → ALERTA GENERAL
  if (res.status === 401) {
    mostrarAlerta(data.message);
    marcarInputsLogin();
    return;
  }

  // ✅ LOGIN OK
  if (data.success) {
  if (data.rol === "admin") {
    window.location.href = "/menu";
  } else {
    window.location.href = "/menu";
  }
}
});


});


//Valdiacion de errores en el formulario de login
function limpiarErrores() {
  document.querySelectorAll(".form-control").forEach(input => {
    input.classList.remove("is-invalid");
  });

  document.querySelectorAll(".invalid-feedback").forEach(div => {
    div.textContent = "";
  });
}

function mostrarErrores(errores) {
  errores.forEach(error => {
    const input = document.querySelector(
      `[name="${error.path}"]`
    );

    if (input) {
      input.classList.add("is-invalid");
      input.nextElementSibling.textContent = error.msg;
    }
  });
}

function mostrarAlerta(mensaje) {
  const alert = document.getElementById("loginAlert");
  alert.textContent = mensaje;
  alert.classList.remove("d-none");
}

function ocultarAlerta() {
  const alert = document.getElementById("loginAlert");
  alert.classList.add("d-none");
  alert.textContent = "";
}

function marcarInputsLogin() {
  ["usuario", "password"].forEach(name => {
    const input = document.querySelector(`[name="${name}"]`);
    input.classList.add("is-invalid");
  });
}