const express = require('express');
const {PORT, DATABASE_URL} = require('./config');
const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('index');
});

app.listen(PORT, () => {
    console.log(`Your app is listening on port ${PORT}`)
});

module.exports = app;