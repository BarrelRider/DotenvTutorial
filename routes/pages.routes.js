const express = require("express");
const router = express.Router();
const axios = require('axios');
const Character = require('../models/character');
const characterMgr = require('./scripts/getCharacter');

router.get('/', (req, res, next) => {
    characterMgr.getCharacters().then(data => {
        let characters = [...data.results];
        res.render('index', {
            characters
        });
        next();
    });
});

router.get('/detail/character/:id', (req, res, next) => {
    const id = req.params.id;
    characterMgr.getCharacterById(id).then(data => {
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
