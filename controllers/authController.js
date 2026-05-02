const Usuario = require('../models/Usuario');

exports.login = async (req, res) => {
  const { usuario, password } = req.body;

  try {
    const user = await Usuario.findOne({ usuario });

    if (!user || user.password !== password) {
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

    // RESPONDER CON ROL
    res.status(200).json({
      success: true,
      rol: user.rol
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error en el servidor'
    });
  }

};