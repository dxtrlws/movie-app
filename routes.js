/**
 * Created by Admin on 4/19/2017.
 */
const express = require('express');
const router = express.Router();
//controller imports
const homeController = require('./controllers/homeController');


//test route
router.use('/', homeController);

//movie routes


//user routes



//export route module
module.exports = router;