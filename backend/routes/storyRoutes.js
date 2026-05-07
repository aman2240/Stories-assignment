const express = require('express');
const router = express.Router();
const storyController = require('../controllers/storyController');
const auth = require('../middleware/auth');

router.get('/', storyController.getStories);
router.get('/bookmarks', auth, storyController.getBookmarks);
router.get('/:id', storyController.getStory);
router.post('/:id/bookmark', auth, storyController.toggleBookmark);

module.exports = router;
