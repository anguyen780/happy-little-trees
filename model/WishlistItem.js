const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class WishlistItem extends Model { }

WishlistItem.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        video_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'video',
                key: 'id'
            }
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'user',
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
