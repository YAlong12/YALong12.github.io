// src/components/Header.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import gilbertLogo from '../assets/gilbert-logo.png';

function Header() {
  return (
    <header className="site-header">
      <div className="container header-content">
        {/* Logo Section */}
        <div className="logo-container">
          <Link to="/">
            <img src={gilbertLogo} alt="Gilbert Logo" className="gilbert-logo" />
          </Link>
        </div>

        {/* Navigation */}
        <nav className="site-nav">
          <ul>
            <li><Link to="/">Home</Link></li>
            <li className="events-menu">
              <Link to="/events">Events</Link>
              {/* Dropdown submenu appears on hover */}
              <ul className="sub-menu">
                <li><Link to="/events/activities">Activities</Link></li>
                <li><Link to="/events/local-events">Local Events</Link></li>
                <li><Link to="/events/sports-schedules">Sports Schedules</Link></li>
              </ul>
            </li>
            <li><Link to="/dashboard">Dashboard</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
