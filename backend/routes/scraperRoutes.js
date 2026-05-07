const express = require('express');
const router = express.Router();
const scraperController = require('../controllers/scraperController');

router.post('/', scraperController.scrapeHackerNews);

module.exports = router;
