const User = require('./User');
const Comment = require('./Comment');
const { Video } = require('./Video');
const WishlistItem = require('./WishlistItem');

User.hasMany(Comment,{
    foreignKey: 'user_id',
});

Comment.belongsTo(User, {
    foreignKey: 'user_id',
});

Comment.belongsTo(Video, {
    foreignKey: 'video_id',
});

Video.hasMany(Comment, {
    foreignKey: 'user_id',
});

WishlistItem.belongsTo(User, {
    foreignKey: 'user_id',
});

WishlistItem.hasMany(Video, {
    foreignKey: 'video_id',
});

// User
    // id
        // has many comments
// Comment
    // id
    // FK user_id
    // body
        // belongs to user
// Video(link)
    // id
        // has many users
// WishlistItem
    // id
    // FK user_id
    // FK video_id
        // belongs to user

// tags??


module.exports = { User, Comment, Video, WishlistItem };
