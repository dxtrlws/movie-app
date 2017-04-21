/**
 * Created by Admin on 4/19/2017.
 */
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const jasonParser = bodyParser.json();
const User = require('./../models/users');


router.get('/users', (req, res) => {
   User.find({})
       .then(user => res.json({
           username: user.name,
           password: user.password
       }))

});

router.post('/signup', jasonParser,(req, res) => {
    const user = User.create(req.body.username, req.body.password);
    res.status(201).json(user);
});

module.exports = router;