const express = require("express");
const router = express.Router();
const axios = require('axios');

async function getEpisodesById(id) {
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

router.get('/about', (req, res, next) => {
    getEpisodesById(1).then(data => {
        const episodes = [...data.episode].map(episode => {
            let episodeId = episode.replace(/[\w].+\//g, '');
            return episodeId;
        })
        res.send(episodes);
    });
});



module.exports = router;