const axios = require('axios');

async function getCharacterEpisodes(idList) {
    const response = await axios.get(`${process.env.API}/episode/${idList}`)
    return response.data;
}

module.exports = getCharacterEpisodes;

