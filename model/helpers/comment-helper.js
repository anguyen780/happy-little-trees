const Comment = require("../Comment");

// create comment
async function createComment(content) {
    const commentData = await Comment.create({
        content: content
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
    const commentData = await Comment.destroy({
       id: id
    });
    return;
}

module.exports = { createComment, findComment, deleteComment }