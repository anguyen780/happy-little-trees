const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class CSV extends Model { }

const keywords = ['APPLE_FRAME', 'AURORA_BOREALIS', 'BARN', 'BEACH', 'BOAT', 'BRIDGE', 'BUILDING', 'BUSHES', 'CABIN', 'CACTUS', 'CIRCLE_FRAME', 'CIRRUS', 'CLIFF', 'CLOUDS', 'CONIFER', 'CUMULUS', 'DECIDUOUS', 'DIANE_ANDRE', 'DOCK', 'DOUBLE_OVAL_FRAME', 'FARM', 'FENCE', 'FIRE', 'FLORIDA_FRAME', 'FLOWERS', 'FOG', 'FRAMED', 'GRASS', 'GUEST', 'HALF_CIRCLE_FRAME', 'HALF_OVAL_FRAME', 'HILLS', 'LAKE', 'LAKES', 'LIGHTHOUSE', 'MILL', 'MOON', 'MOUNTAIN', 'MOUNTAINS', 'NIGHT', 'OCEAN', 'OVAL_FRAME', 'PALM_TREES', 'PATH', 'PERSON', 'PORTRAIT', 'RECTANGLE_3D_FRAME', 'RECTANGULAR_FRAME', 'RIVER', 'ROCKS', 'SEASHELL_FRAME', 'SNOW', 'SNOWY_MOUNTAIN', 'SPLIT_FRAME', 'STEVE_ROSS', 'STRUCTURE', 'SUN', 'TOMB_FRAME', 'TREE', 'TREES', 'TRIPLE_FRAME', 'WATERFALL', 'WAVES', 'WINDMILL', 'WINDOW_FRAME', 'WINTER', 'WOOD_FRAMED'];

CSV.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        episode: {
            type: DataTypes.STRING
        },
        title: {
            type: DataTypes.STRING
        },
        ...keywords.map((keyword) => {
            return {
                name: keyword,
                type: ReturnType.BOOLEAN,
                nonNull: true
            }
        }
        ),
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'csv'
    });
    

    module.exports = { CSV, keywords };