const express = require("express");
const router = express.Router();
const characterController = require('../controllers/character');
const episodeController = require('../controllers/episodes');

router.get('/', characterController.getCharacters);
router.get('/detail/character/:id', characterController.getCharacterById);
router.get('/detail/episode/:id', episodeController.getEpisodeById);


module.exports = router;
