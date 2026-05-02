const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');

// ✅ IMPORTAR VALIDACIONES
const { validarUsuario } = require('../validations/usuariosValidator');
const validarErrores = require('../validations/validarErrores');

router.post(
  '/login',
  validarUsuario,
  validarErrores,
  authController.login
);


// ✅ RUTA /me (para obtener rol)
router.get('/me', (req, res) => {
  if (!req.session.usuario) {
    return res.status(401).json({ ok: false });
  }

  res.json({
    ok: true,
    rol: req.session.usuario.rol
  });
});


router.get('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.status(500).send('Error al cerrar sesión');
    }

    res.redirect('/login');
  });
});

module.exports = router;