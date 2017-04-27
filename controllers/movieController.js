const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const jasonParser = bodyParser.json();
const User = require('./../models/users');


module.exports = router;