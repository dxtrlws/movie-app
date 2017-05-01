const express = require('express');
const router = express.Router();

// Get movies
router.get('/', ensureAuthenticated, (req, res) => {
    res.render('mymovies', { title: 'My Movies' });
});


function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        res.redirect('/users/login');
    }
}


module.exports = router;