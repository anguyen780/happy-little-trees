const User = require("../User");

// create user
async function createUser(username, password) {
    const userData = await User.create({
        username: username,
        password: password
    });
    return userData;
}

// user by id
async function findUser(id) {
    const userData = await User.findByPk(id, {
        attributes: {
            exclude: ['password']
        }
    });
    return userData;
}

// user by username and password
async function findUserByUsernameAndPassword(username, password) {
    const userData = await User.findOne({
        where: {
            username: username,
            password, password
        },
        attributes: {
            exclude: ['password']
        }
    });

    return userData;
}

module.exports = { createUser, findUser, findUserByUsernameAndPassword };