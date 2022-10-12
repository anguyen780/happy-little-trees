require('dotenv').config();
const path = require('path');
const exphbs = require('express-handlebars');
const bcrypt = require('bcrypt');

const express = require('express');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const routes = require('./routes');

// app setup
const app = express();
const PORT = process.env.EXPRESS_PORT || process.env.PORT || 3001;

// session setup
async function setupSession() {
    // TODO
}

// middleware setup
function setupMiddleware() {
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(express.static(path.join(__dirname, 'public')));
}

// handlebars setup
function setupHandlebars() {
    const hbs = exphbs.create({});
    app.engine('handlebars', hbs.engine);
    app.set('view engine', 'handlebars');
}

// routes setup
function setupRoutes() {
    app.use(routes);
}

// database setup
async function setupSequelize() {
    // await sequelize.sync({ force: false });
}

async function start() {
    await setupSession();
    setupMiddleware();
    setupHandlebars();
    setupRoutes();
    await setupSequelize();

    // open server
    app.listen(PORT, () => {
        console.log(`Listening on port: ${PORT}`);
    });
}

// run start
start();
