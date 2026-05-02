exports.soloAdmin = (req, res, next) => {
  if (!req.session.usuario) {
    return res.redirect('/login');
  }

  if (req.session.usuario.rol !== 'admin') {
    return res.status(403).send('Acceso denegado');
  }

  next();
};

exports.autenticado = (req, res, next) => {
  if (!req.session.usuario) {
    return res.redirect('/login');
  }
  next();
};
