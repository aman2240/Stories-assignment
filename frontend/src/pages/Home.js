import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import StoryList from '../components/StoryList';
import { AuthContext } from '../context/AuthContext';
import { API_URL } from '../config';

function Home() {
  const [stories, setStories] = useState([]);
  const [bookmarks, setBookmarks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { token } = useContext(AuthContext);

  useEffect(() => {
    fetchStories();
    if (token) {
      fetchBookmarks();
    }
  }, [token, currentPage]);

  const fetchStories = async () => {
    try {
      const config = token ? {
        headers: { Authorization: `Bearer ${token}` },
        params: { page: currentPage, limit: 10 }
      } : {};
      
      const response = await axios.get(`${API_URL}/api/stories`, config);
      setStories(response.data.stories);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error('Error fetching stories:', error);
    }
  };

  const fetchBookmarks = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/stories/bookmarks`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setBookmarks(response.data.map(b => b._id));
    } catch (error) {
      console.error('Error fetching bookmarks:', error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container">
        <StoryList stories={stories} bookmarks={bookmarks} setBookmarks={setBookmarks} currentPage={currentPage} />
        {token && totalPages > 1 && (
          <div style={{ marginTop: '20px', textAlign: 'center' }}>
            <button 
              className="btn btn-primary" 
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              style={{ marginRight: '10px' }}
            >
              Previous
            </button>
            <span>Page {currentPage} of {totalPages}</span>
            <button 
              className="btn btn-primary" 
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              style={{ marginLeft: '10px' }}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
