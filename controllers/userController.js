/**
 * Created by Admin on 4/19/2017.
 */
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const jasonParser = bodyParser.json();
const User = require('./../models/users');



//Users to sign up
router.post('/signup', (req, res) => {
    const requiredFields = ['username', 'password'];
    for (let i = 0; i < requiredFields.length; i++) {
        const field = requiredFields[i];
        if (!(field in req.body)) {
            const message = `Missing ${field} in request body`;
            console.error(message);
            return res.status(400).send(message);
        }
    }
    const newUser = User.create({
        username: req.body.username,
        password: req.body.password
    });

    res.render('mylist', { title: 'My Movie List' });

});

//Users to login
router.post('/login', (req, res) => {
    User.findOne({ username: req.body.username }, function(err, user) {
        if (!user) {
            res.render('index', { title: 'no account found' });
        } else {
            if (req.body.password === user.password) {
                req.session.user = user;
                res.redirect('/mylist');

            } else {
                res.render('index', { title: 'My Movie List' });
            }
        }
    });


});

router.get('/mylist', (req, res) => {

    if (req.session && req.session.user) {
        User.findOne({ username: req.session.username }, function(err, user) {
            console.log({ username: req.session.user });
            if (!user) {
                req.session.reset();
                res.redirect('/');
            } else {
                res.locals.user = user;
                res.render('mylist', { title: 'My Movie List' });
            }
        });
    } else {
        res.redirect('/');
    }
});


module.exports = router;