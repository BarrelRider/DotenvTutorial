const axios = require('axios');
const getCharacterEpisodes = require('./getCharacterEpisodes');

async function getCharacters() {
    const response = await axios.get(`${process.env.API}/character`);
    return response.data;
}

async function getCharacterById(id) {
    console.log(id);
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

module.exports = {
    getCharacterById,
    getCharacters
};