const { body, param } = require("express-validator");

exports.validarProducto = [
  body("nombre")
    .trim()
    .notEmpty().withMessage("El nombre es obligatorio")
    .isLength({ min: 3 }).withMessage("El nombre debe tener al menos 3 caracteres"),

  body("precio")
    .notEmpty().withMessage("El precio es obligatorio")
    .isFloat({ min: 0 }).withMessage("El precio debe ser un número positivo"),

  body("stock")
    .notEmpty().withMessage("El stock es obligatorio")
    .isInt({ min: 0 }).withMessage("El stock debe ser un número entero positivo"),

  body("descripcion")
    .notEmpty().withMessage("La descripción es obligatoria")
    .isLength({ max: 200 }).withMessage("La descripción es muy larga"),
  

body("imagen").custom((value, { req }) => {
  if (!req.file) {
    throw new Error("La imagen es obligatoria");
  }
  return true;
})

];

exports.validarId = [
  param("id")
    .isMongoId()
    .withMessage("El ID no es válido"),
];