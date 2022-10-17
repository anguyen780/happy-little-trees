const { User } = require("../index");

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
    const userData = await User.findByPk(id);
    return userData;
}

// user by username and password
async function findUserByUsername(username) {
    const userData = await User.findOne({
        where: {
            username: username
        }
    });

    return userData;
}

module.exports = { createUser, findUser, findUserByUsername };