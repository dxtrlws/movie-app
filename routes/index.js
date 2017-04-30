const express = require('express');
const router = express.Router();

// Get homepage
router.get('/', (req, res) => {
    res.render('index');
});

// Get search page
router.get('/search', (req, res) => {
    res.render('search');
});

module.exports = router;