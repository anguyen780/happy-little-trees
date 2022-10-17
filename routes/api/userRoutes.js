const router = require('express').Router();
const { findUserByUsername, createUser } = require('../../model/helpers/user-helper');
const { createWishListItem, deleteWishListItem } = require('../../model/helpers/wishList-helper');
const { badRequest, handleError } = require('./requestError');
const { requireAuth } = require('../auth');
const { requireBody } = require('./middleware');

function createSessionForUser(req, user, callback) {
    req.session.save(() => {
        req.session.userId = user.id; // TODO maybe encrypt?
        req.session.loggedIn = true;
        callback();
    });
}

// create new user
router.post('/', requireBody, async (req, res) => {
    // this should create a new User, send back a 201 and the User JSON,
    //as well as save the session on success
    // on failure handle the error

    const { username, password } = req.body;
    try {
        if(!username) {
            badRequest('missing username');
        }

        if(!password) {
            badRequest('missing password');
        }

        const user = await createUser(username, password);

        createSessionForUser(req, user, () => {
            res.status(201).json({
                id: user.id,
                username: user.username
            });
        });
    } catch(err) {
        handleError(err);
    }
});

// login to user session
router.post('/login', requireBody, async (req, res) => {
    // this should save a session and send back a 200 and the User JSON on success
    // on failure handle the error

    const { username, password } = req.body;
    try {
        if(!username) {
            badRequest('missing username');
        }

        if(!password) {
            badRequest('missing password');
        }

        const user = await findUserByUsername(username);

        if(!user || !(user.checkPassword(password))) {
            // do not let them know which one!
            badRequest('username or password is incorrect!');
        }

        createSessionForUser(req, user, () => {
            res.status(200).json({
                id: user.id,
                username: user.username
            });
        });
    } catch(err) {
        handleError(err);
    }
});

// logout of user session
router.post('/logout', (req, res) => {
    // this should destroy the session and send back a 204 on success
    // on failure handle the error

    if(req.session.loggedIn) {
        req.session.destroy(() => {
            res.sendStatus(204);
        });
    } else {
        res.sendStatus(200);
    }
});

router.post('/wishlist', requireAuth, requireBody, async (req, res) => {
    const userId = req.session.userId;
    const videoId = req.body.videoId;
    try {
        const wishlistItem = await createWishListItem(userId, videoId);
        res.status(201);
        res.json(wishlistItem);
    } catch(err) {
        handleError(err, res);
    }
});

router.delete('/wishlist', requireAuth, requireBody, async (req, res) => {
    const userId = req.session.userId;
    const videoId = req.body.videoId;
    try {
        if(!videoId) {
            badRequest('missing videoId parameter in body');
        }
        await deleteWishListItem(userId, videoId);
        res.sendStatus(204);
    } catch(err) {
        handleError(err, res);
    }
});

module.exports = router;
