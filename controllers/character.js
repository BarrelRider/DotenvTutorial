const CharacterMgr = require('../scripts/getCharacter');
const Character = require('../models/character');

exports.getCharacters = (req, res, next) => {
    const page = req.query.page || "";
    CharacterMgr.getCharacters(page).then(data => {
        let characters = [...data.results];
        let info = data.info;
        res.render('index', {
            characters,
            info,
            page,
        });
    });
}

exports.getBallFondlers = (req, res, next) => {
    CharacterMgr.getBallFondlers().then(data => {
        let characters = [...data];
        res.render("ballfondlers", {
            characters
        });
    })
}

exports.getPickleRick = (req, res, next) => {
    CharacterMgr.getPickleRick().then(data => {
        const character = new Character(data);

        res.render("picklerick", {
            character
        });
    })
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