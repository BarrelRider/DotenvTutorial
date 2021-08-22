
exports.getEpisodeById = (req, res, next) => {
    const id = req.params.id;
    res.send({
        id
    });
    next();
}