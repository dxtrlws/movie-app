const express = require('express');
const {PORT, DATABASE_URL} = require('./config');
const app = express();
const routes = require('./routes');
//Set view engine
app.set('view engine', 'ejs');
//Use static files
app.use(express.static('public'));

//Use routes
app.use('/', routes);






app.listen(PORT, () => {
    console.log(`Yo dawg, your app is listening on port ${PORT}`)
});

module.exports = app;