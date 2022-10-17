const router = require('express').Router();
const { withAuth } = require('./auth');

router.get('/', (req, res) => {
    res.render('homepage', {
        logged_in: req.session.loggedIn
    });
});

router.get('/signup', withAuth, (req, res) => {
    res.render('signup');
});

router.get('/login', withAuth, (req, res) => {
    res.render('login');
});

router.get('/videos', (req, res) => {
    res.render('videos', {
        logged_in: req.session.loggedIn
    });
});

router.get('/wishlist', (req, res) => {
    res.render('wishlist', {
        logged_in: req.session.loggedIn
    });
});

module.exports = router;