import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import StoryList from '../components/StoryList';
import { AuthContext } from '../context/AuthContext';
import { API_URL } from '../config';

function Bookmarks() {
  const [bookmarks, setBookmarks] = useState([]);
  const [bookmarkIds, setBookmarkIds] = useState([]);
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }
    fetchBookmarks();
  }, [token, navigate]);

  const fetchBookmarks = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/stories/bookmarks`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setBookmarks(response.data);
      setBookmarkIds(response.data.map(b => b._id));
    } catch (error) {
      console.error('Error fetching bookmarks:', error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container">
        <h2 style={{ marginBottom: '20px' }}>My Bookmarks</h2>
        {bookmarks.length === 0 ? (
          <p>No bookmarks yet</p>
        ) : (
          <StoryList stories={bookmarks} bookmarks={bookmarkIds} setBookmarks={setBookmarkIds} />
        )}
      </div>
    </div>
  );
}

export default Bookmarks;
