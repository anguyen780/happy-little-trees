const seedUsers = require('./User-seeds');
const seedWishlist = require('./WishlistItems-seeds');
const seedComments = require('./Comment-seeds');

const sequelize = require('../config/connection');

const seedAll = async () => {
    await sequelize.sync({ force: true });
    await seedUsers();
    await seedWishlist();
    await seedComments();

    process.exit(0);
};

seedAll();