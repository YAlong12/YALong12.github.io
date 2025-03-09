// src/components/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>Contact Us</h3>
          <p>📍 50 E Civic Center Dr, Gilbert, AZ 85296</p>
          <p>📞 (480) 503-6000</p>
          <p>✉️ info@cassie.com</p>
          <div className="social-links">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
          </div>
        </div>

        <div className="footer-section">
          <h3>Quick Links</h3>
          <Link to="/events">Events</Link>
          <Link to="/about">About Us</Link>
          <Link to="/privacy">Privacy Policy</Link>
          <Link to="/terms">Terms of Service</Link>
        </div>

        <div className="footer-section">
          <h3>Hours of Operation</h3>
          <p>Monday - Friday: 8:00 AM - 5:00 PM</p>
          <p>Saturday: 9:00 AM - 1:00 PM</p>
          <p>Sunday: Closed</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 Cassie. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
