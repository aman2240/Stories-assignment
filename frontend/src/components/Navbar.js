import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div className="navbar">
      <h1 onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
        HackerNews Stories
      </h1>
      <div className="navbar-buttons">
        {user ? (
          <>
            <button className="btn btn-primary" onClick={() => navigate('/bookmarks')}>
              Bookmarks
            </button>
            <button className="btn btn-secondary" onClick={logout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <button className="btn btn-primary" onClick={() => navigate('/login')}>
              Login
            </button>
            <button className="btn btn-secondary" onClick={() => navigate('/register')}>
              Register
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default Navbar;
