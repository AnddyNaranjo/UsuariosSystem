const express = require("express");
const router = express.Router();
const { autenticado, esAdmin } = require("../validations/authValidator");

router.get(
  "/menu",
  autenticado,
  esAdmin,
  (req, res) => {
    res.render("admin");
  }
);

module.exports = router;