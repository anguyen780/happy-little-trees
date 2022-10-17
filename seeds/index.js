const seedVideos = require('./Video-seeds');
const seedUsers = require('./User-seeds');
const seedWishlistItems = require('./WishlistItems-seeds');
const seedComments = require('./Comment-seeds');

const sequelize = require('../config/connection');

const seedAll = async () => {
    await sequelize.sync({ force: true });
    await seedVideos();
    await seedUsers();
    await seedWishlistItems();
    // await seedComments();

    process.exit(0);
};

seedAll();