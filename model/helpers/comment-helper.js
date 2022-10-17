const { Comment } = require("../index");

// create comment
async function createComment(content, user_id) {
    const commentData = await Comment.create({
        content: content,
        user_id: user_id
    });
    return commentData;
}

// comment by id
async function findComment(id) {
    const commentData = await Comment.findByPk({
        id: id
    });
    return commentData;
}

// delete comment
async function deleteComment(id) {
    await Comment.destroy({
        id: id
    });
}

module.exports = { createComment, findComment, deleteComment };