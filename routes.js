/**
 * Created by Admin on 4/19/2017.
 */
const express = require('express');
const router = express.Router();
//controller imports
const homeController = require('./controllers/homeController');
const userController = require('./controllers/userController');


//test route
router.get('/', homeController);

//movie routes


//user routes
router.get('/users', userController);
router.post('/signup', userController);
router.post('/login', userController);


//export route module
module.exports = router;