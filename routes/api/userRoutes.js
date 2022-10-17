const router = require('express').Router();
const { findUserByUsername, createUser } = require('../../model/helpers/user-helper');
const { badRequest, handleError } = require('./requestError');

function createSessionForUser(req, user, callback) {
    req.session.save(() => {
        req.session.userId = user.id; // TODO maybe encrypt?
        req.session.loggedIn = true;
        callback();
    });
}

// create new user
router.post('/', async (req, res) => {
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
router.post('/login', async (req, res) => {
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
        handleError(err, res);
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

module.exports = router;
