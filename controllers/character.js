const CharacterMgr = require('../scripts/getCharacter');
const Character = require('../models/character');

exports.getCharacters = (req, res, next) => {
    CharacterMgr.getCharacters().then(data => {
        let characters = [...data.results];
        res.render('index', {
            characters
        });
    });
}

exports.getCharacterById = (req, res, next) => {
    const id = req.params.id;
    CharacterMgr.getCharacterById(id).then(data => {
        const character = new Character(data);
        
        character.episodes = data.episodeList.length > 0 ? [...data.episodeList] : [data.episodeList];
        res.render('detail', {
            character,
        });
    });
}