// src/components/Header.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css'; // Create this file to style your header

const Header = () => {
  return (
    <header className="site-header">
      <div className="container">
        <h1 className="site-title">
          <Link to="/">Cassie</Link>
        </h1>
        <nav className="site-nav">
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/events">Events</Link></li>
            <li><Link to="/dashboard">Dashboard</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
