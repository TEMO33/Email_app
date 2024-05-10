import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContextProvider';

const HomePage = () => {
  const { isAuthenticated, setIsAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsAuthenticated(false);
    navigate('/login');
  };

  return (
    <header className="header">
      <div className="logo">Mail</div>
      <nav className="nav">
        <Link to="/c/inbox" className="link">Inbox</Link>
        <Link to="/c/sent" className="link">Sent</Link>
        <Link to="/c/archived" className="link">Archived</Link>
        <Link to="/compose" className="link">Compose</Link>
      </nav>
      <button className="logout-button" onClick={handleLogout}>
        Log Out
      </button>
    </header>
  );
};

export default HomePage;

