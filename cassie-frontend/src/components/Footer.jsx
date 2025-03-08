// src/components/Footer.jsx
import React from 'react';
import './Footer.css'; // Create this file for styling

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="container">
        <p>&copy; {new Date().getFullYear()} Cassie. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
