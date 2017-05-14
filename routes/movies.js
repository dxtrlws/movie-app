const express = require('express');
const router = express.Router();
const Movie = require('./../models/movies');
const User = require('./../models/user');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

// Get movies
router.get('/', ensureAuthenticated, (req, res) => {
    Movie
        .find({ _creator: req.user.id, watchStatus: false })
        .sort({ createdAt: 'desc' })
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

// Get watched movies
router.get('/watchedMovies', ensureAuthenticated, (req, res) => {
    Movie
        .find({ _creator: req.user.id, watchStatus: true })
        .sort({ createdAt: 'desc' })
        .exec()
        .then((movies) => {
            res.render('watchedMovies', { movies, title: 'My watched Movies' });
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
            req.flash('success_msg', 'Your movie has been added');
            res.send({ redirect: '/mymovies' });
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ message: 'Something went wrong' });
        });

});

// delete movie
router.delete('/:id', (req, res) => {
    Movie
        .findByIdAndRemove(req.params.id)
        .exec()
        .then(() => {
            req.flash('success_msg', 'Movie has been removed');
            res.status(200).send({ redirect: '/mymovies' });
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: 'Something went wrong' });
        });
});

// Update Movie
router.put('/:id', (req, res) => {
    Movie
        .findByIdAndUpdate(req.params.id, { watchStatus: true })
        .exec()
        .then(() => {
            req.flash('success_msg', 'Movie has been added to watach list');
            res.status(200).send({ redirect: '/mymovies' });
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