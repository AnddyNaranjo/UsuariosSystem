document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('registerForm');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    limpiarErrores();

    // ✅ Obtener valores
    const nombre = document.getElementById('nombre').value;
    const usuario = document.getElementById('usuario').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const rol = document.getElementById('rol').value;

    try {
      const res = await fetch('/usuarios', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre, usuario, email, password, rol })
      });

      const data = await res.json();

      if (res.status === 400) {
        if (Array.isArray(data.errores)) {
          mostrarErrores(data.errores);
        } else {
          alert('Error de validación inesperado');
        }
        return;
      }

      // ✅ Registro correcto
      alert('Usuario registrado correctamente');
      window.location.href = '/menu';

    } catch (error) {
      console.error('Error:', error);
      alert('Error en el servidor');
    }
  });
});


// FUNCIONES DE VALIDACIÓN 

function limpiarErrores() {
  document.querySelectorAll('.form-control, .form-select').forEach(input => {
    input.classList.remove('is-invalid');
  });

  document.querySelectorAll('.invalid-feedback').forEach(div => {
    div.textContent = '';
  });
}

function mostrarErrores(errores) {
  const erroresPorCampo = {};

  errores.forEach(error => {
    if (!erroresPorCampo[error.path]) {
      erroresPorCampo[error.path] = error.msg;
    }
  });

  Object.keys(erroresPorCampo).forEach(campo => {
    const input = document.querySelector(`[name="${campo}"]`);

    if (input) {
      input.classList.add("is-invalid");

      const feedback =
        input.parentElement.querySelector(".invalid-feedback");

      if (feedback) {
        feedback.textContent = erroresPorCampo[campo];
      }
    }
  });
}