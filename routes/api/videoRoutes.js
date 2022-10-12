const router = require('express').Router();

// create new comment on video
router.post('/:videoId/comment', (req, res) => {
    // this should create a new Comment, as well as send back 201 and the Comment JSON
    // this should also need to verify the user is logged in and use their user ID
    //stored in the session to create the Comment
    // on failure handle error

    // TODO implememnt

    res.sendStatus(501);
});

router.delete('/:videoId/comment/:commentId', (req, res) => {
    // this should delete a Comment, as well as send back a 204
    // this should also need to verify the user is logged in and use their user ID
    //stored in the session to verify they can delete the Comment
    // on failure handle error

    // TODO implement

    res.sendStatus(501);
});

module.exports = router;
