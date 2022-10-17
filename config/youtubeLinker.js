require('dotenv').config();
const e = require('express');
const fetch = require('node-fetch');
const playlists = require('./playlists.json');

const YT_KEY = process.env.YT_KEY;

const playlistItemsRoute = 'https://www.googleapis.com/youtube/v3/playlistItems';

async function playlistItems(playlistId) {
    const response = await fetch(`${playlistItemsRoute}?key=${YT_KEY}&playlistId=${playlistId}&part=contentDetails&maxResults=15`);
    if(response.ok) {
        const body = await response.json();
        const videoIds = body.items.map(item => `https://youtube.com/watch?v=${item.contentDetails.videoId}`);
        return videoIds;
    } else {
        console.log(response.status);
        throw new Error('Failed request: ', response.status);
    }
}

async function multiplePlaylistItems(playlistIds) {
    const playlists = [];
    for(const playlistId of playlistIds) {
        playlists.push(await playlistItems(playlistId));
    }
    return playlists;
}

const links = () => {
    return multiplePlaylistItems(playlists).then((playlistItems) => {
        const out = [];
        for(const season of playlistItems) {
            for(let i = 0; i < 13; i++) {
                out.push(season[i]);
            }
        }
        return out;
    });
};

module.exports = links;
