const express = require('express');
const router = express.Router();

const Usuario = require('../models/Usuario');

const usuariosController = require('../controllers/usuariosController');
const {validarUsuarioRegistro}= require('../validations/usuariosValidator');
const validarErrores = require('../validations/validarErrores');



// Obtener todos los usuarios
router.get('/', async (req, res) => {
  try {
    const usuarios = await Usuario.find();
        console.log(usuarios);
    res.json(usuarios);
  } catch (error) {
    res.status(500).send('Error al obtener usuarios');
  }
});

//Crear nuevo usuario
router.post('/', validarUsuarioRegistro, validarErrores,usuariosController.createUsuario);


module.exports = router;