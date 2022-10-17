const { Video, User } = require("../index");

async function findWishList(id) {
    const user = await User.findByPk(id, {
        include: [
            {
                model: Video,
                attributes: ['id', 'episode', 'title', 'url']
            }
        ]
    });
    return user.videos;
}

module.exports = { findWishList };
