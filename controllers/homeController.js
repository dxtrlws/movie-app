/**
 * Created by Admin on 4/19/2017.
 */
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('index', {
        title: 'Movie Watch List'
    });
});

router.get('/logout', (req, res) => {
    req.session.reset();
    res.redirect('/');
});

router.get('/login', (req, res) => {
    res.render('login', {
        title: 'Login'
    });
});

router.get('/signup', (req, res) => {
    res.render('signup', {
        title: 'Sign Up'
    });
});

// router.get('*', (req, res) => {
//     res.render('index', {title: 'Movie Watch List'});
// });


module.exports = router;