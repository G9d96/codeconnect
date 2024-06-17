const express = require('express');
const passport = require('passport');
const User = require('../models/user');
const router = express.Router();

router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login'
}));

router.post('/register', (req, res) => {
    const newUser = new User({ username: req.body.username, password: req.body.password });
    newUser.save(err => {
        if (err) return res.send('Erro ao registrar');
        res.redirect('/login');
    });
});

module.exports = router;
