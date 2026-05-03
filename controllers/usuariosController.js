const Usuario = require('../models/Usuario');
const bcrypt = require('bcrypt');

exports.createUsuario = async (req, res) => {
  const { nombre, usuario, email, password, rol } = req.body;

  try {
    // HASHEAR CONTRASEÑA
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const nuevoUsuario = new Usuario({
      nombre,
      usuario,
      email,
      password: passwordHash, 
      rol
    });

    await nuevoUsuario.save();

    res.json({
      success: true,
      message: 'Usuario creado'
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Error al registrar usuario'
    });
  }
};