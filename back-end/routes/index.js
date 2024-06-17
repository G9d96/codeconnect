const express = require('express');
const Post = require('../models/post');
const router = express.Router();

router.post('/post', (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).send('Você precisa estar logado para postar');
    const newPost = new Post({ title: req.body.title, content: req.body.content, author: req.user._id });
    newPost.save(err => {
        if (err) return res.send('Erro ao criar postagem');
        res.redirect('/');
    });
});

router.get('/posts', (req, res) => {
    Post.find().populate('author').exec((err, posts) => {
        if (err) return res.send('Erro ao buscar postagens');
        res.json(posts);
    });
});

module.exports = router;
