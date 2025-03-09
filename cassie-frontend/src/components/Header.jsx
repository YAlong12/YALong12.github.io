import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import gilbertLogo from '../assets/gilbert-logo.png';

const Header = () => {
  return (
    <>
      {/* Top Navigation Bar */}
      <div className="top-nav">
        <div className="top-nav-content">
          <div className="language-selector">
            🌍 English ▼
          </div>
          <div className="auth-links">
            <Link to="/login" className="login-link">Sign In</Link> |
            <Link to="/register" className="login-link"> Create an Account</Link>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="header">
        <div className="header-inner">
          <div className="logo">
            <Link to="/">
              <img src={gilbertLogo} alt="Gilbert Logo" className="gilbert-logo" />
            </Link>
          </div>
          <nav className="nav-links">
            <Link to="/">Home</Link>
            <div className="dropdown">
              <Link to="/events">Events ▼</Link>
              <div className="dropdown-content">
                <Link to="/events/activities">Activities</Link>
                <Link to="/events/local-events">Local Events</Link>
                <Link to="/events/sports">Sports Schedules</Link>
              </div>
            </div>
            <Link to="/dashboard">Dashboard</Link>
          </nav>
        </div>
      </header>
    </>
  );
};

export default Header;