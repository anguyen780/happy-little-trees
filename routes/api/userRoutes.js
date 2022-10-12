const router = require('express').Router();

// create new user
router.post('/', (req, res) => {
    // this should create a new User, send back a 201 and the User JSON,
    //as well as save the session on success
    // on failure handle the error

    // TODO implement

    res.sendStatus(501);
});

// login to user session
router.post('/login', (req, res) => {
    // this should save a session and send back a 200 and the User JSON on success
    // on failure handle the error

    // TODO implement

    res.sendStatus(501);
});

// logout of user session
router.post('/logout', (req, res) => {
    // this should destroy the session and send back a 204 on success
    // on failure handle the error

    // TODO implement

    res.sendStatus(501);
});

module.exports = router;
