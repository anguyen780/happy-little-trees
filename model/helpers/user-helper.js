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
    const userData = await User.findByPk({
        id: id
    });
    return userData;
}

module.exports = { createUser, findUser }