const express = require('express');
const router = express.Router();

// Get movies
router.get('/', (req, res) => {
    res.render('mymovies');
});

module.exports = router;