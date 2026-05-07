const Story = require('../models/Story');
const User = require('../models/User');

exports.getStories = async (req, res) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    const isAuthenticated = !!token;

    if (!isAuthenticated) {
      const stories = await Story.find()
        .sort({ points: -1 })
        .limit(10);
      
      return res.json({
        stories,
        totalPages: 1,
        currentPage: 1
      });
    }

    const { page = 1, limit = 10 } = req.query;
    const stories = await Story.find()
      .sort({ points: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const count = await Story.countDocuments();

    res.json({
      stories,
      totalPages: Math.ceil(count / limit),
      currentPage: page
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getStory = async (req, res) => {
  try {
    const story = await Story.findById(req.params.id);
    if (!story) {
      return res.status(404).json({ message: 'Story not found' });
    }
    res.json(story);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.toggleBookmark = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    const storyId = req.params.id;

    const bookmarkIndex = user.bookmarks.indexOf(storyId);
    
    if (bookmarkIndex > -1) {
      user.bookmarks.splice(bookmarkIndex, 1);
    } else {
      user.bookmarks.push(storyId);
    }

    await user.save();
    res.json({ bookmarks: user.bookmarks });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getBookmarks = async (req, res) => {
  try {
    const user = await User.findById(req.userId).populate('bookmarks');
    res.json(user.bookmarks);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
