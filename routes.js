/**
 * Created by Admin on 4/19/2017.
 */
const express = require('express');
const routes = express.Router();
//controller imports
const testController = require('./controllers/testController');

//test route
routes.get('/', testController.get);

//movie routes


//user routes



//export route module
module.exports = routes;