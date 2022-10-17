const User = require('./User');
const Comment = require('./Comment');
const { Video } = require('./Video');
const WishlistItem = require('./WishlistItem');

User.hasMany(Comment, {
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

Video.belongsToMany(User, {
    through: WishlistItem,
    foreignKey: 'video_id',
    onDelete: 'CASCADE'
});

User.belongsToMany(Video, {
    through: WishlistItem,
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

module.exports = { User, Comment, Video, WishlistItem };
