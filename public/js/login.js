document.addEventListener('DOMContentLoaded', () => {

  const form = document.getElementById('loginForm');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const usuario = document.getElementById('usuario').value;
    const password = document.getElementById('password').value;

    try {
      const res = await fetch('/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ usuario, password })
      });

      console.log('STATUS:', res.status);

      if (!res.ok) {
        throw new Error('Error en el servidor');
      }

      const data = await res.json();
      console.log('DATA:', data);

      if (data.success) {
        window.location.href = '/menu';
      } else {
        alert(data.message);
      }

    } catch (error) {
      console.error('ERROR:', error);
      alert('Error en el servidor (500)');
    }
  });

});