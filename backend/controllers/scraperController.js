const axios = require('axios');
const cheerio = require('cheerio');
const Story = require('../models/Story');

exports.scrapeHackerNews = async (req, res) => {
  try {
    const response = await axios.get('https://news.ycombinator.com');
    const $ = cheerio.load(response.data);
    const stories = [];

    $('.athing').each((index, element) => {
      const title = $(element).find('.titleline > a').first().text();
      const url = $(element).find('.titleline > a').first().attr('href') || '#';
      
      const subtext = $(element).next('tr').find('.subtext');
      const pointsText = subtext.find('.score').text();
      const points = pointsText ? parseInt(pointsText.replace(' points', '')) : 0;
      const author = subtext.find('.hnuser').text() || 'unknown';
      const postedAt = subtext.find('.age').attr('title') || subtext.find('.age').text() || 'unknown';

      if (title) {
        stories.push({ title, url, points, author, postedAt });
      }
    });

    await Story.deleteMany({});
    await Story.insertMany(stories);

    res.json({ message: 'Scraped successfully', count: stories.length });
  } catch (error) {
    res.status(500).json({ message: 'Scraping failed', error: error.message });
  }
};
