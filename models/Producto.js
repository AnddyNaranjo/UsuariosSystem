const mongoose = require('mongoose');

const ProductoSchema = new mongoose.Schema(
  {
    nombre: String,
    precio: Number,
    stock: Number,
    descripcion: String,
    imagen: String // ← ruta de la imagen
  },
  {
    collection: 'productos',
    versionKey: false
  }
);

module.exports = mongoose.model('Producto', ProductoSchema);