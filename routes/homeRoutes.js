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

module.exports = router;