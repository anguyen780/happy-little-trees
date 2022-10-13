const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connections');

class Video extends Model { }

Video.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'user',
          key: 'id'
        }
      },

    //   url
    // season & episode
    // tags
  }, 
  {
  sequelize,
  freezeTableName: true,
  underscored: true,
  modelName: 'video'
});
module.exports = Video;