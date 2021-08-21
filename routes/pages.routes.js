const express = require("express");
const router = express.Router();
const axios = require('axios');

async function getCharacterById(id) {
    const response = await axios.get(`${process.env.API}/character/${id}`);
    return response.data;
}

router.get('/', (req, res, next) => {
    res.send({
        path: "root",
        env: process.env.SECRET_KEY
    });
    next()
});

router.get('/characterepisodes', (req, res, next) => {
    getCharacterById(1).then(data => {
        const episodesIdlist = [...data.episode].map(episode => {
            let episodeId = episode.replace(/[\w].+\//g, '');
            return episodeId;
        })
        res.send({
            episodesIdlist: episodesIdlist,
            episodes: data.episode
        });
    });
});



module.exports = router;