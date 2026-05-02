const { body, param } = require("express-validator");

exports.validarUsuarioRegistro = [
  body("nombre")
    .trim()
    .notEmpty().withMessage("El nombre es obligatorio")
    .bail()
    .isLength({ min: 3 }).withMessage("El nombre debe tener al menos 3 caracteres"),

  body("usuario")
    .trim()
    .notEmpty().withMessage("El usuario es obligatorio")
    .bail()
    .isLength({ min: 3, max: 20 }).withMessage("El usuario debe tener entre 3 y 20 caracteres"),

  body("email")
    .trim()
    .notEmpty().withMessage("El email es obligatorio")
    .bail()
    .isEmail().withMessage("El email no es válido"),

  body("password")
  .trim()
    .notEmpty().withMessage("La contraseña es obligatoria")
    .bail()
    .isLength({ min: 8 }).withMessage("La contraseña debe tener al menos 8 caracteres"),

  body("rol")
  .trim()
    .notEmpty().withMessage("Seleccionar el rol es obligatorio"),

];

exports.validarUsuario = [
  body("usuario")
    .isLength({ min: 3, max: 20 }).withMessage("El usuario ingresado no es es válido"),

  body("password")
    .isLength({ min: 8 }).withMessage("La contraseña es incorrecta"),

];

exports.validarId = [
  param("id")
    .isMongoId()
    .withMessage("El ID no es válido"),
];