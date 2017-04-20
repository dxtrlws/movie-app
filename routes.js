/**
 * Created by Admin on 4/19/2017.
 */
const express = require('express');
const {testController} = require('./controllers/testController');
//controller imports

const routes = express.Router();

routes.get('/test', (req, res) => {
    res.render('index');
});

// routes.get('/test', testController.get);


module.exports = routes;