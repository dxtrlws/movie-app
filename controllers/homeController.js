/**
 * Created by Admin on 4/19/2017.
 */
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
   res.render('index', {title: 'Movie Watch List'});
});


module.exports =router;
