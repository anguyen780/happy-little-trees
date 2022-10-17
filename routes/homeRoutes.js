const router = require('express').Router();
const { findWishList } = require('../model/helpers/wishList-helper');
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

router.get('/wishlist', async (req, res) => {
    const wishlistItemData = await findWishList(req.session.userId)
    const wishlistItems = wishlistItemData.map((wishlistItem) => {
        return wishlistItem.get({ plain: true });
    })
    
    res.render('wishlist', {
        logged_in: req.session.loggedIn,
        wishlistItemData: wishlistItems
    });
});

module.exports = router;