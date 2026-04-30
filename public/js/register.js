document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('registerForm');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

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
      console.log('DATA del registro:', data);
      if (data.success) {
        alert('Usuario registrado correctamente');
        window.location.href = '/';
      } else {
        alert(data.message);
      }

    } catch (error) {
      console.error(error);
      alert('Error en el servidor');
    }
  });
});
``