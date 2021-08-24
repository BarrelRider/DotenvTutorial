const axios = require('axios');


exports.getEpisodeById = (req, res, next) => {
    // const id = req.params.id;
    // res.send({
    //     id
    // });
    // next();  
    const id = req.params.id;  
    console.log(id);
    const episode = axios.get(`${process.env.API}/episode/${id}`);   
    console.log(episode.id); 
    res.render('episodeDetail',{
        episode
    });
    next();
}