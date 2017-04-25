const express = require('express');
const { PORT, DATABASE_URL } = require('./config');
const app = express();
const bodyParser = require('body-parser');
const routes = require('./routes');
const mongoose = require('mongoose');
const sessions = require('client-sessions');

//connect to mongo database
const db = mongoose.connect(DATABASE_URL, function(error) {
    if (error) console.log(error);

    console.log("connection to Mongo successful");
});

//Set view engine
app.set('view engine', 'ejs');
//middleware
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(sessions({
    cookieName: 'session',
    secret: 'a;lksdjfiewapksldngfaiea;lskdfj',
    duration: 30 * 60 * 1000,
    activeDuration: 5 * 60 * 1000,
}));
//Use routes
app.use('/', routes);






app.listen(PORT, () => {
    console.log(`Yo dawg, your app is listening on port ${PORT}`)
});

module.exports = app;