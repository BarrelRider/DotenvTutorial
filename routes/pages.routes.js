const express = require("express");
const router = express.Router();
const axios = require('axios');
const Character = require('../models/character');

async function getCharacterById(id) {
    const response = await axios.get(`${process.env.API}/character/${id}`);
    const episodesIdlist = [...response.data.episode].map(episode => {
        let episodeId = episode.replace(/[\w].+\//g, '');
        return episodeId;
    });
    
    const episodeList = await getCharacterEpisodes(episodesIdlist);
    return {
        ...response.data,
        episodeList
    };
}

async function getCharacterEpisodes(idList) {
    const response = await axios.get(`${process.env.API}/episode/${idList}`)
    return response.data;
}

async function getCharacters() {
    const response = await axios.get(`${process.env.API}/character`);
    return response.data;
}

// async function getEpisodes() {
//     const response = await axios.get(`${process.env.API}/episode`);
//     return response.data
// }

router.get('/', (req, res, next) => {
    getCharacters().then(data => {
        let characters = [...data.results];
        res.render('index', {
            characters
        });
        next();
    });
});

router.get('/detail/character/:id', (req, res, next) => {
    const id = req.params.id;
    getCharacterById(id).then(data => {
        const character = new Character(data);
        
        character.episodes = data.episodeList.length > 0 ? [...data.episodeList] : [data.episodeList];
        return character;
    })
    .then(character => {
        res.render('detail', {
            character,
        })
        next();
    });
});

router.get('/detail/episode/:id', (req, res, next) => {
    const id = req.params.id;

    res.send({
        id
    });

    next();
});


module.exports = router;
