# HackerNews Scraper - MERN Stack Application

A full-stack web application that scrapes top stories from HackerNews and allows users to bookmark their favorites.

## Features

- Web scraper for HackerNews top 10 stories
- User authentication (Register/Login)
- Bookmark functionality
- Responsive UI
- MongoDB Atlas integration

## Tech Stack

- **Frontend**: React, React Router, Axios
- **Backend**: Node.js, Express
- **Database**: MongoDB Atlas
- **Authentication**: JWT

## Project Structure

```
hackernews-app/
├── backend/
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── scraperController.js
│   │   └── storyController.js
│   ├── middleware/
│   │   └── auth.js
│   ├── models/
│   │   ├── Story.js
│   │   └── User.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── scraperRoutes.js
│   │   └── storyRoutes.js
│   ├── .env
│   ├── package.json
│   └── server.js
└── frontend/
    ├── public/
    │   └── index.html
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.js
    │   │   └── StoryList.js
    │   ├── context/
    │   │   └── AuthContext.js
    │   ├── pages/
    │   │   ├── Bookmarks.js
    │   │   ├── Home.js
    │   │   ├── Login.js
    │   │   └── Register.js
    │   ├── App.js
    │   ├── index.css
    │   └── index.js
    └── package.json
```

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- MongoDB Atlas account
- npm or yarn

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file with the following variables:
```
PORT=5000
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_secret_key_here
```

4. Start the backend server:
```bash
npm start
```

For development with auto-reload:
```bash
npm run dev
```

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the React app:
```bash
npm start
```

The app will open at `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Stories
- `GET /api/stories` - Get all stories (sorted by points)
- `GET /api/stories?page=1&limit=10` - Get stories with pagination
- `GET /api/stories/:id` - Get single story
- `GET /api/stories/bookmarks` - Get user bookmarks (protected)
- `POST /api/stories/:id/bookmark` - Toggle bookmark (protected)

### Scraper
- `POST /api/scrape` - Manually trigger scraping

## Usage

1. The scraper runs automatically when the server starts
2. Visit the home page to see top 10 HackerNews stories
3. Register/Login to bookmark stories
4. Click the star icon to bookmark/unbookmark stories
5. View your bookmarks on the Bookmarks page

## Environment Variables

### Backend (.env)
```
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname
JWT_SECRET=your_random_secret_key
```

## Features Implemented

- ✅ Web scraper for HackerNews
- ✅ Automatic scraping on server start
- ✅ Manual scraping via API
- ✅ JWT authentication
- ✅ User registration and login
- ✅ Story listing sorted by points
- ✅ Bookmark functionality
- ✅ Protected routes
- ✅ React Context for state management
- ✅ Pagination support
- ✅ Clean folder structure

## Notes

- The scraper fetches the top 10 stories from HackerNews
- Stories are stored in MongoDB and sorted by points
- Authentication is required for bookmarking
- The frontend uses proxy to connect to backend during development
