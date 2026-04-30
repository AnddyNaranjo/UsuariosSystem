const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
  email: String,
  rol: String,
  password: String,
  usuario: String,
  nombre: String
}, {
  collection: 'usuarios' // 👈 nombre EXACTO de tu colección
});

module.exports = mongoose.model('Usuario', usuarioSchema);