const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const axios = require('axios');
const authRoutes = require('./routes/authRoutes');
const storyRoutes = require('./routes/storyRoutes');
const scraperRoutes = require('./routes/scraperRoutes');
const scraperController = require('./controllers/scraperController');
const dns = require('dns');

dns.setServers(['8.8.8.8', '8.8.4.4', '1.1.1.1']);

dotenv.config();

const app = express();

app.use(cors({
  origin: ['http://localhost:3000', 'https://hackernews-stories-frontend.onrender.com'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.use('/api/auth', authRoutes);
app.use('/api/stories', storyRoutes);
app.use('/api/scrape', scraperRoutes);

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    scraperController.scrapeHackerNews({}, { 
      json: (data) => console.log('Initial scrape:', data.message),
      status: () => ({ json: () => {} })
    });
  })
  .catch(err => console.log('MongoDB connection error:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  startSelfPing();
});

function startSelfPing() {
  const RENDER_URL = process.env.RENDER_URL;
  
  if (!RENDER_URL) {
    console.log('RENDER_URL not set, skipping self-ping');
    return;
  }

  setInterval(async () => {
    try {
      const response = await axios.get(`${RENDER_URL}/health`);
      console.log(`Self-ping successful: ${response.data.timestamp}`);
    } catch (error) {
      console.error('Self-ping failed:', error.message);
    }
  }, 14 * 60 * 1000);
}

