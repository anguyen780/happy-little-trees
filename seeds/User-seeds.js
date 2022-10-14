const { User } = require('../model');

const userData = [
    {
        username: 'JakeP',
        password: '12345'

    },
    {
        username: 'KyleL',
        password: '54321'
    },
    {
        username: 'KatieH',
        password: '24680'
    }
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;