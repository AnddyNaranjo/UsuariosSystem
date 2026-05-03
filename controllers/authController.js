const bcrypt = require('bcrypt');
const Usuario = require('../models/Usuario');

exports.login = async (req, res) => {
  const { usuario, password } = req.body;

  try {
    const user = await Usuario.findOne({ usuario });

    // Verificar usuario existe
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Usuario o contraseña incorrectos'
      });
    }

    // Comparar contraseña con bcrypt
    const passwordValida = await bcrypt.compare(password, user.password);

    if (!passwordValida) {
      return res.status(401).json({
        success: false,
        message: 'Usuario o contraseña incorrectos'
      });
    }

    // GUARDAR EN SESIÓN
    req.session.usuario = {
      id: user._id,
      usuario: user.usuario,
      rol: user.rol
    };

    // RESPUESTA OK
    res.status(200).json({
      success: true,
      rol: user.rol
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Error en el servidor'
    });
  }
};