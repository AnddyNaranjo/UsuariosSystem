const Usuario = require('../models/Usuario');
const bcrypt = require('bcrypt');

async function initAdmin() {
  try {
    const totalUsuarios = await Usuario.countDocuments();

    if (totalUsuarios === 0) {
      const passwordHash = await bcrypt.hash('admin123', 10);

      const admin = new Usuario({
        nombre: 'Administrador',
        usuario: 'admin',
        email: 'admin@admin.com',
        password: passwordHash,
        rol: 'admin'
      });

      await admin.save();

      console.log('✅ ADMIN CREADO AUTOMÁTICAMENTE');
      console.log('👉 Usuario: admin');
      console.log('👉 Password: admin123');
    } else {
      console.log('Ya existen usuarios, no se crea admin');
    }
  } catch (error) {
    console.error('Error al inicializar admin:', error);
  }
}

module.exports = initAdmin;