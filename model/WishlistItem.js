const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connections');

class WishlistItem extends Model { }

WishlistItem.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        body: {
            type: DataTypes.STRING,
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'user',
                key: 'id'
            }
        },
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'wishlistItem'
    });


module.exports = WishlistItem;