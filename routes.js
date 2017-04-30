/**
 * Created by Admin on 4/19/2017.
 */
const express = require('express');
const router = express.Router();
//controller imports
const homeController = require('./controllers/homeController');
const userController = require('./controllers/userController');
const movieController = require('./controllers/movieController');

//home routes
router.get('/', homeController);
router.get('/login', homeController);
router.get('/signup', homeController);
router.get('/logout', homeController);

//movie routes
router.get('/mylist', movieController);

//user routes
router.post('/signup', userController);
router.post('/login', userController);
router.get('/mylist', userController);


//export route module
module.exports = router;