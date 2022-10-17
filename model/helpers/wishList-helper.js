const { Video, User } = require("../index");

async function findWishList(id) {
    const users = await User.findByPk(id, {
        include: [
            {
                model: Video
            }
        ]
    });
    users.map(user => user.videos);
    return;
}

module.exports = { findWishList };
