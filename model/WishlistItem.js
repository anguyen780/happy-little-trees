const User = require('./User');
const { Video } = require('./Video');
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class WishlistItem extends Model { }

WishlistItem.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: User,
                key: 'id'
            }
        },
        video_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Video,
                key: 'id'
            }
        },
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        timestamps: false,
        modelName: 'wishlistItem'
    });


module.exports = WishlistItem;
