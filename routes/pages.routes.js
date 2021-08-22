const express = require("express");
const router = express.Router();
const axios = require('axios');
const Character = require('../models/character');

async function getCharacterById(id) {
    const response = await axios.get(`${process.env.API}/character/${id}`);
    return response.data;
}

async function getCharacterEpisodes(idList) {
    let ids = [...idList].join(',');
    const response = await axios.get(`${process.env.API}/episode/${ids}`)
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

router.get('/detail/:id', (req, res, next) => {
    const id = req.params.id;
    getCharacterById(id).then(data => {
        console.log(data);
        const episodesIdlist = [...data.episode].map(episode => {
            let episodeId = episode.replace(/[\w].+\//g, '');
            return episodeId;
        });

        const character = new Character(data);
        character.episodes = episodesIdlist;

        return character
    }).then(character => {
        res.render('detail', {
            character,
        })
        next();
    });
})

// router.get('/characterepisodes', (req, res, next) => {
//     getEpisodes().then(data => {
//         console.log(data);
//         res.send(data);
//         next();
//     });
// });



// getCharacterById(1).then(data => {
//     const episodesIdlist = [...data.episode].map(episode => {
//         let episodeId = episode.replace(/[\w].+\//g, '');
//         return episodeId;
//     })
//     res.send({
//         episodesIdlist: episodesIdlist,
//         episodes: data.episode
//     });
// });

module.exports = router;
