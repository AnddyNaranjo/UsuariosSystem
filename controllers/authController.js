const Usuario = require('../models/Usuario');

exports.login = async (req, res) => {
  const { usuario, password } = req.body;
console.log("Datos recibidos en login:", { usuario, password }); // 👈 VERIFICA LOS DATOS RECIBIDOS
  try {
    // buscar usuario con esos datos EXACTOS
    const user = await Usuario.findOne({ usuario, password });
  console.log("usuario encontrado:", user);
    if (!user) {
      console.log("Usuario no encontrado o contraseña incorrecta");
      return res.json({
        success: false,
        message: 'Usuario o contraseña incorrectos'
      });
    }

    // login correcto
   // req.session.usuario = user;

    res.json({ success: true });

  } catch (error) {
    res.status(500).json({ success: false });
  }
};