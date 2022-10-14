const { Comment } = require('../model');

const commentData = [
    {
        content: "I love this episode!",
        user_id: 1
    },
    {
        content: "These colors are great!",
        user_id: 2
    },
    {
        content: "I can't wait to paint this.",
        user_id: 3
    }
];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;