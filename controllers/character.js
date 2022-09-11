const CharacterMgr = require('../scripts/getCharacter');
const Character = require('../models/character');

/*TODO: Handle query strings for search operations */
exports.getCharacters = (req, res, next) => {
    const queryParams = new URLSearchParams(req.query).toString();
    const page = req.query.page;
    CharacterMgr.getCharacters(queryParams).then(data => {
        let characters = [...data.results];
        let info = data.info;
        res.render('index', {
            characters,
            info,
        });
    }).catch(err => {
        res.render("index", {
            characters: [],
            info: null,
            error: err.message
        })
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