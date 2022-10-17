const { Video } = require("../index");

//get video by id
async function findVideo(id) {
    const videoData = await Video.findByPk({
        id: id
    });
    return videoData;
}

module.exports = { findVideo };