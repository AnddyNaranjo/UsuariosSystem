const form = document.getElementById("productoForm");
const lista = document.getElementById("listaProductos");

let modal;

// ✅ Al cargar la página
document.addEventListener("DOMContentLoaded", () => {
  modal = new bootstrap.Modal(
    document.getElementById("modalProducto")
  );
  cargarProductos();
});

document.addEventListener("DOMContentLoaded", () => {
  cargarProductos();
});

const cargarProductos = async () => {
  const res = await fetch("/productos");
  const productos = await res.json();

  const tbody = document.getElementById("tablaProductos");
  tbody.innerHTML = "";

  productos.forEach((p, index) => {
    const fila = `
      <tr>
        <th scope="row">${index + 1}</th>
        <td>${p.nombre}</td>
        <td>$${p.precio}</td>
        <td>${p.stock}</td>
        <td>${p.descripcion}</td>
        <td class="text-center align-middle">
          <img src="${p.imagen}" width="200">
        </td>
        <td >
        <div class="d-grid gap-2">
          <button class="btn btn-sm btn-danger" onclick="eliminar('${p._id}')">
            Eliminar
          </button>
          
<button class="btn btn-sm btn-warning"
  onclick="modificarProducto('${p._id}')">
  Modificar
</button>

          </div>
        </td>
      </tr>
    `;
    tbody.innerHTML += fila;
  });
};


form.addEventListener("submit", async (e) => {
  e.preventDefault();

  limpiarErrores();

  const formData = new FormData();
  formData.append("nombre", nombre.value);
  formData.append("precio", precio.value);
  formData.append("stock", stock.value);
  formData.append("descripcion", descripcion.value);
  formData.append("imagen", imagen.files[0]);

  const res = await fetch("/productos", {
    method: "POST",
    body: formData,
  });

  const data = await res.json();

  if (!res.ok) {
    mostrarErrores(data.errores);
    return;
  }
  // Cerrar el modal
      const modalElement = document.getElementById('registrarProducto');
      const modalInstance = bootstrap.Modal.getInstance(modalElement);
      modalInstance.hide();
  form.reset();
  cargarProductos();
});





function modificarProducto(id) {
  fetch(`/productos`)
    .then(res => res.json())
    .then(productos => {
      const producto = productos.find(p => p._id === id);

      document.getElementById("editId").value = producto._id;
      document.getElementById("editNombre").value = producto.nombre;
      document.getElementById("editPrecio").value = producto.precio;
      document.getElementById("editStock").value = producto.stock;
      document.getElementById("editDescripcion").value = producto.descripcion;

      modal.show();
    });
}

function guardarCambios() {
  const id = document.getElementById("editId").value;
  const producto = {
    nombre: editNombre.value,
    precio: editPrecio.value,
    stock: editStock.value,
    descripcion: editDescripcion.value
  };
  fetch(`/productos/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(producto)
  })
  .then(() => {
    modal.hide();
    cargarProductos();
  });
}

const eliminar = async (id) => {
  console.log("Eliminar producto con ID:", id);
  await fetch(`/productos/${id}`, { method: "DELETE" });
  cargarProductos();
};


//Mostrar errores de validación
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


function limpiarErrores() {
  document.querySelectorAll(".form-control").forEach(input => {
    input.classList.remove("is-invalid");
  });

  document.querySelectorAll(".invalid-feedback").forEach(div => {
    div.textContent = "";
  });
}

cargarProductos();
