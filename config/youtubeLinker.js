require('dotenv').config();
const fetch = require('node-fetch');

const YT_KEY = process.env.YT_KEY;

const playlistItemsRoute = 'https://www.googleapis.com/youtube/v3/playlists';

const withQueryParameters = function (url, params) {
    let output = url + '?';
    for(const param in params) {
        if(Array.isArray(params[param])) {
            output += 'part='
            const array = params[param];
            for(const i in array) {
                output += encodeURIComponent(array[i]);
                if(i < (array.length - 1)) {
                    output += ',';
                }
            }
        } else {
            output += `${param}=${encodeURIComponent(params[param])}`;
        }
        output += '&';
    }

    output = output.substring(0, output.length - 2);

    console.log(output);
    return output;
};

async function playlistItems(playlistId) {
    const response = await fetch(
        withQueryParameters(playlistItemsRoute, {
            key: YT_KEY,
            part: ['items', 'player', 'contentDetails', 'snippet'],
            id: playlistId
        })
    );
    console.log(await response.json());
}

playlistItems('PLAEQD0ULngi69x_7JbQvSMprLRK_KSVLu');

module.exports = { playlistItems };
