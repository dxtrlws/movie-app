const express = require('express');
const {PORT, DATABASE_URL} = require('./config');
const routes = require('./routes');
const bodyParser = require('body-parser');
const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use('/', routes);



app.listen(PORT, () => {
    console.log(`Your app is listening on port ${PORT}`)
});

module.exports = app;