const express = require('express');
const app = express();
const path = require('path');
const session = require('express-session');

app.use(session({
  secret: 'secreto',
  resave: false,
  saveUninitialized: true
}));
// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// conexión BD
const connectDB = require('./routes/db');
connectDB();

// rutas
const authRoutes = require('./routes/auth');
const usuariosRoutes = require('./routes/usuarios');

app.use(authRoutes);
app.use('/usuarios', usuariosRoutes);

// rutas vistas
app.get('/menu', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'menu.html'));
});

app.get('/registro', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'registrar.html'));
});

// servidor
app.listen(3000, () => {
  console.log('Servidor en http://localhost:3000');
});