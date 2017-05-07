const express = require('express');
const router = express.Router();


// Get homepage
router.get('/', (req, res) => {
    res.render('index', { title: 'Movie Watch List' });
    // console.log({ username: req.user.username });
});

// Get search page
router.get('/search', ensureAuthenticated, (req, res) => {
    res.render('search', { title: 'Movie Watch - Search' });
});



function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        res.redirect('/users/login');
    }
}

module.exports = router;