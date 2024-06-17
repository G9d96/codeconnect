const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bodyParser = require('body-parser');
const session = require('express-session');

const app = express();

// Conexão com MongoDB
mongoose.connect('mongodb://localhost/forum', { useNewUrlParser: true, useUnifiedTopology: true });

// Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({ secret: 'forumsecret', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

// Rotas
app.get('/', (req, res) => {
    res.send('Fórum funcionando');
});

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
