require('dotenv').config();
const path = require('path');
const exphbs = require('express-handlebars');
const bcrypt = require('bcrypt');

const express = require('express');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const sequelize = require('./config/connection');
const routes = require('./routes');
const csvReader = require('./model/csvReader');
const { Video } = require('./model/Video');
const { multiplePlaylistItems } = require('./config/youtubeLinker');

// app setup
const app = express();
const PORT = process.env.EXPRESS_PORT || process.env.PORT || 3001;

// session setup
async function setupSession() {
    // TODO
    const sess = {

        secret: process.env.YT_KEY,
        cookie: {},
        resave: false,
        saveUninitialized: true,
        store: new SequelizeStore({
            db: sequelize
        })
    }
    app.use(session(sess));
}

// middleware setup
function setupMiddleware() {
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(express.static(path.join(__dirname, 'public')));
    app.use(express.static(path.join(__dirname, "js")));
    
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
    await sequelize.sync({ force: false });
    const count = await Video.count();
    if(count === 0) {
        const playlistItemsPromise = multiplePlaylistItems(['PLAEQD0ULngi69x_7JbQvSMprLRK_KSVLu']);
        const csv = await csvReader();
        const playlistItems = await playlistItemsPromise;
        await Video.bulkCreate(csv);
        console.log(JSON.stringify(playlistItems, null, 2));
    }
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