// src/components/Footer.jsx
import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="site-footer">
      <p>&copy; {new Date().getFullYear()} Cassie. All rights reserved.</p>
    </footer>
  );
}

export default Footer;
