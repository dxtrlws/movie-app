const express = require('express');
const router = express.Router();
const Movie = require('./../models/movies');
const User = require('./../models/user');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

// Get movies
router.get('/', (req, res) => {
    Movie
        .find({ _creator: req.user.id })
        .exec()
        .then((movies) => {
            // return res.status(200).json(movies);
            res.render('mymovies', { movies, title: 'My Movies' });
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ message: 'Unable to find movies' })
        })


});

// Add movie
router.post('/', jsonParser, (req, res) => {
    console.log({ _id: req.user.id });

    const newMovie = Movie.create({
            title: req.body.title,
            imageURL: req.body.imageURL,
            releaseDate: req.body.releaseDate,
            overview: req.body.overview,
            rating: req.body.rating,
            _creator: { _id: req.user.id }
        })
        .then(() => {
            res.status(200).json(newMovie);
            // res.redirect('/mymovies');
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
            // res.redirect('/mymovies');
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