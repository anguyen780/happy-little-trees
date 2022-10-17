const csvReader = require('../model/csvReader');
const links = require('../config/youtubeLinker');
const { Video } = require('../model');

const seedVideos = async () => {
    const count = await Video.count();
    if(count > 0) {
        // returns null if the server is already setup
        return null;
    }
    // This code will run asynchronously and not stop the server from starting up
    //we do this in order to make sure it doesn't lag
    return await Promise.all([links(), csvReader()])
        .then(async ([urls, csv]) => {
            for(const i in urls) {
                csv[i].url = urls[i];
            }
            return await Video.bulkCreate(csv);
        });
};

module.exports = seedVideos;