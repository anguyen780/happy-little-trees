const e = require('express');
const { findUserByUsernameAndPassword, createUser } = require('../../model/helpers/user-helper');

const router = require('express').Router();

function createSessionForUser(res, user, callback) {
    res.session.save(() => {
        res.session.userId = user.id; // TODO maybe encrypt?
        res.session.loggedIn = true;
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
            res.status(400).json({ message: 'missing username' });
            return;
        }

        if(!password) {
            res.status(400).json({ message: 'missing password' });
            return;
        }

        const user = await createUser(body.username, body.password);

        createSessionForUser(res, user, () => {
            res.status(201).json({
                id: user.id,
                username: user.username
            });
        });
    } catch(err) {
        // TODO handle errors more gracefully
        req.sendStatus(500);
    }
});

// login to user session
router.post('/login', async (req, res) => {
    // this should save a session and send back a 200 and the User JSON on success
    // on failure handle the error

    const body = req.body;
    try {
        const user = await findUserByUsernameAndPassword(body.username, body.password);
        if(!user) {
            // do not let them know which one!
            res.status(400).json({ message: 'username or password is incorrect!' });
            return;
        }

        createSessionForUser(res, user, () => {
            res.status(200).json({
                id: user.id,
                username: user.username
            });
        });
    } catch(err) {
        // TODO handle errors more gracefully
        res.sendStatus(500);
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
        req.sendStatus(200);
    }
});

module.exports = router;
