import React, { useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { API_URL } from '../config';

function StoryList({ stories, bookmarks, setBookmarks, currentPage = 1 }) {
  const { token, user } = useContext(AuthContext);

  const toggleBookmark = async (storyId) => {
    if (!token) {
      alert('Please login to bookmark stories');
      return;
    }

    try {
      const response = await axios.post(
        `${API_URL}/api/stories/${storyId}/bookmark`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setBookmarks(response.data.bookmarks);
    } catch (error) {
      console.error('Bookmark error:', error);
    }
  };

  const isBookmarked = (storyId) => {
    return bookmarks.includes(storyId);
  };

  return (
    <div className="story-list">
      {stories.map((story, index) => (
        <div key={story._id} className="story-item">
          <div className="story-content">
            <div>
              <span style={{ color: '#828282', marginRight: '10px' }}>{(currentPage - 1) * 10 + index + 1}.</span>
              <a href={story.url} target="_blank" rel="noopener noreferrer" className="story-title">
                {story.title}
              </a>
            </div>
            <div className="story-meta">
              {story.points} points by {story.author} | {story.postedAt}
            </div>
          </div>
          {user && (
            <button 
              className="bookmark-btn" 
              onClick={() => toggleBookmark(story._id)}
            >
              {isBookmarked(story._id) ? '★' : '☆'}
            </button>
          )}
        </div>
      ))}
    </div>
  );
}

export default StoryList;
