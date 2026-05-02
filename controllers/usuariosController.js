const Usuario = require('../models/Usuario');

exports.createUsuario = async (req, res) => {
  const { nombre, usuario, email, password, rol } = req.body;
 console.log("Datos recibidos en registro:", req.body); // VERIFICA LOS DATOS RECIBIDOS
  try {
    const nuevoUsuario = new Usuario({
      nombre,
      usuario,
      email,
      password,
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