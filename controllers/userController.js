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
    User.findOne({ username: req.body.username }), (err, user) => {
        if (!user) {
            res.render('index', { err: 'Invalid username or password' });
        } else {
            if (req.body.password === user.password) {
                res.render('mylist');
            } else {
                res.render('index', { err: 'Invalid username or password' });
            }
        }
    };

});

module.exports = router;