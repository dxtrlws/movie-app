const express = require('express');
const router = express.Router();
const Movie = require('./../models/movies');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();


// const mongoose = require('mongoose');
// mongoose.Promise = global.Promise;

// Get movies
router.get('/', ensureAuthenticated, (req, res) => {
    res.render('mymovies', { title: 'My Movies' });
});

// Add movie
router.post('/', jsonParser, (req, res) => {
    const newMovie = Movie.create({
            title: req.body.title,
            imageURL: req.body.imageURL,
            releaseDate: req.body.releaseDate,
        })
        .then(() => {
            res.status(200);
            res.redirect('/mymovies');
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ message: 'Something went wrong' });
        });
});

// delete movie
router.delete('/:id', (req, res) => {
    const id = req.body.id;
    Movie
        .findByIdAndUpdate(id)
        .exec()
        .then(() => {
            res.status(200);
            res.redirect('/mymovies');
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: 'Something went wrong' });
        });
});


function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        res.redirect('/users/login');
    }
}


module.exports = router;