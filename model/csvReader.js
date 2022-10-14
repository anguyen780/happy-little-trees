const fetch = require('node-fetch');
const csv = require('csv');

// NOTE
// because we are importing the Video model, this requires that sequelize
//has already been initialize run this after sequelize.sync
const { keywords } = require('./Video');

const url = 'https://raw.githubusercontent.com/fivethirtyeight/data/master/bob-ross/elements-by-episode.csv';

async function csvReader() {
    const response = await fetch(url);                                      // fetch the CSV
    const text = await response.text();                                     // parse it into text
    const parser = csv.parse(text);                                         // parse it using csv.parse
    const out = [];                                                         // create output array
    let skippedFirst = false;                                               // whether or not we've skipped the first one
    for await(const record of parser) {                                     // for each record of parser
        if(!skippedFirst) {                                                     // the first record is the CSV header, we need to skip this
            skippedFirst = true;                                                    // set skippedFirst to true 
            continue;                                                               // skip
        }
        const recordOut = {                                                     // create a recordOut object for this iteration
            episode: record[0],                                                     // episode is first key
            title: record[1]                                                        // title is second key
        };
        for(let i = 2; i < record.length; i++) {                                    // for every index past the second
            recordOut[keywords[i - 2]] = record[i] === '1';                         // set the recordOut value of the keyword at that index to a boolean
        }                                                                           //that reads whether or not the record at that index is equal to 1
        out.push(recordOut);                                                    // push the recordOut to the out array
    }
    return out;                                                             // return record out
}

module.exports = csvReader;
