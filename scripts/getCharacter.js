const axios = require('axios');

async function getCharacters() {
    const response = await axios.get(`${process.env.API}/character`);
    return response.data;
}

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

module.exports = {
    getCharacterById,
    getCharacters,
    getCharacterEpisodes
};
