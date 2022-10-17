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
const links = require('./config/youtubeLinker');
const { Video } = require('./model/Video');

// app setup
const app = express();
const PORT = process.env.EXPRESS_PORT || process.env.PORT || 3001;

// session setup
async function setupSession() {
    const secret = process.env.SESS_SECRET;
    if(!secret)
        throw new Error('No "SESS_SECRET" environment variable found! Make sure to set this via the .env file!');

    let salt = process.env.SESS_SALT;
    if(!salt) {
        console.log('WARNING: No SESS_SALT environment variable found! A new one will be generated using bcrypt...');
        salt = await bcrypt.genSalt(5);
        console.log(`Salt: ${salt}`);
        console.log("            ^ It's recommend you store this salt value in your .env file as SESS_SALT!");
    }

    const sess = session({
        secret: await bcrypt.hash(secret, salt),
        cookie: {
            maxAge: 24 * 60 * 60 * 1000, // 1 day
            sameSite: 'strict'
        },
        resave: false,
        saveUninitialized: true,
        store: new SequelizeStore({
            db: sequelize
        })
    });

    app.use(sess);
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
    if(count > 0) {
        // returns null if the server is already setup
        return null;
    }
    // This code will run asynchronously and not stop the server from starting up
    //we do this in order to make sure it doesn't lag
    return Promise.all([links(), csvReader()])
        .then(async ([urls, csv]) => {
            for(const i in urls) {
                csv[i].url = urls[i];
            }
            return await Video.bulkCreate(csv);
        });
}

async function start() {
    await setupSequelize();
    await setupSession();
    setupMiddleware();
    setupHandlebars();
    setupRoutes();

    // open server
    app.listen(PORT, () => {
        console.log(`Listening on port: ${PORT}`);
    });
}

// run start
start();