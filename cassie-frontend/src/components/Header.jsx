import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Header.css';
import gilbertLogo from '../assets/gilbert-logo.png';

const Header = () => {
  const { isAuthenticated, user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    window.location.href = '/';
  };

  return (
    <header className="main-header">
      <div className="header-content">
        <div className="left-section">
          <div className="logo">
            <Link to="/">
              <img src={gilbertLogo} alt="Gilbert Logo" />
            </Link>
          </div>
          <nav className="nav-links">
            <Link to="/">Home</Link>
            <Link to="/events">Events</Link>
            {isAuthenticated && !user?.isAdmin && <Link to="/dashboard">Dashboard</Link>}
          </nav>
        </div>

        <div className="auth-buttons">
          {isAuthenticated ? (
            <button onClick={handleLogout} className="logout-button">Logout</button>
          ) : (
            <>
              <Link to="/login">Sign In</Link>
              <Link to="/register" className="register-button">Join</Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;