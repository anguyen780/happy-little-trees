const { WishlistItem } = require('../model');

const wishlistItemData = [
    {
        user_id: 1,
        video_id: 42
    }
];

const seedWishlistItems = () => WishlistItem.bulkCreate(wishlistItemData);

module.exports = seedWishlistItems;