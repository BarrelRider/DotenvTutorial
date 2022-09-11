const axios = require('axios');

async function getCharacters(queryString) {
    const response = await axios.get(`${process.env.API}/character?${queryString}`)
        .catch(err => {
            return err;
        });
    return response.data;
}

async function getBallFondlers() {
    const response = await axios.get(`${process.env.API}/character/207,129,28,34`);
    return response.data;
}

async function getPickleRick() {
    const response = await axios.get(`${process.env.API}/character/265`);
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
    getCharacterEpisodes,
    getBallFondlers,
    getPickleRick
};
