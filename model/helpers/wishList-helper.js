const { Video, User, WishlistItem } = require("../index");

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

async function createWishListItem(userId, videoId) {
    const wishlistItem = await WishlistItem.create({
        user_id: userId,
        video_id: videoId
    });

    return wishlistItem;
}

async function deleteWishListItem(userId, videoId) {
    await WishlistItem.destroy({
        where: {
            user_id: userId,
            video_id: videoId
        }
    });
}

module.exports = { findWishList, createWishListItem, deleteWishListItem };
