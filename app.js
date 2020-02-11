const express = require('express');

const morgan =  require('morgan')

const app = express();

app.use(morgan('common'))

const playStoreApps = require('./playstoreapps/playstoreapps.js')

app.get('/apps', (req, res) => {

    const {sort, genres} = req.query;

    if (sort) {
        if(![rating, app].include(sort)) {
            return res
                    .status(400)
                    .send('Sort must be by ratings or apps')
        }
    }    

    if (genres) {
        if(![Action, Puzzle, Strategy, Casual, Arcade, Card].include(genres)) {
            return res 
                    .status(400)
                    .send('Genres must be action, puzzle, strategy, casual, arcade, or card');
        }
    }

    let results = playStoreApps
        .filter(playStoreApps => 
            playStoreApps
                .app
                .toLowerCase()
                .includes(genres.toLowerCase()));

    if (sort) {
        results.sort((a, b) => {
            return a[sort] > b[sort] ? 1 : a[sort] < b[sort] ? -1 : 0;
        })
    }


    res
        .json(results)

})

module.exports = app;