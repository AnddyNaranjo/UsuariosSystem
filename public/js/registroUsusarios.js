document.addEventListener("DOMContentLoaded", async () => {
  const btnRegistrar = document.getElementById("btnRegistrarUsuario");

  try {
    const res = await fetch("/me");
    const data = await res.json();

    // si no es admin, ocultar el botón
    if (!data.ok || data.rol !== "admin") {
      btnRegistrar.style.display = "none";
    }

  } catch (error) {
    // si pasa algo raro, ocultamos por seguridad
    btnRegistrar.style.display = "none";
  }
});