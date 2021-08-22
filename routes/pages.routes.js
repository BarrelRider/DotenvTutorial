const express = require("express");
const router = express.Router();
const axios = require('axios');

async function getCharacterById(id) {
    const response = await axios.get(`${process.env.API}/character/${id}`);
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
        })
        res.render('detail', {
            name: data.name,
            status: data.status,
            gender: data.gender,
            avatar: data.image
        });
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
