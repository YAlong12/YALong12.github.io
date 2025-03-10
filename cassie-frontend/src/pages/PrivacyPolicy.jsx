import React from 'react';
import './StaticPages.css';

const PrivacyPolicy = () => {
  return (
    <div className="static-page">
      <div className="static-page-content">
        <h1>Privacy Policy</h1>
        
        <section>
          <p>Last updated: March 10, 2024</p>
          
          <h2>Introduction</h2>
          <p>
            Your privacy is important to us. This Privacy Policy explains how we collect, use, 
            disclose, and safeguard your information when you use our service.
          </p>
        </section>

        <section>
          <h2>Information We Collect</h2>
          <h3>Personal Information</h3>
          <ul>
            <li>Email address</li>
            <li>Name (when provided)</li>
            <li>Contact information</li>
            <li>Event preferences and interests</li>
          </ul>

          <h3>Usage Information</h3>
          <ul>
            <li>Browser type</li>
            <li>Access times</li>
            <li>Pages viewed</li>
            <li>IP address</li>
          </ul>
        </section>

        <section>
          <h2>How We Use Your Information</h2>
          <ul>
            <li>To provide and maintain our service</li>
            <li>To notify you about changes to our service</li>
            <li>To provide customer support</li>
            <li>To gather analysis or valuable information to improve our service</li>
            <li>To monitor the usage of our service</li>
            <li>To detect, prevent and address technical issues</li>
          </ul>
        </section>

        <section>
          <h2>Data Security</h2>
          <p>
            We implement appropriate security measures to protect your personal information. 
            However, no method of transmission over the Internet is 100% secure, and we cannot 
            guarantee absolute security.
          </p>
        </section>

        <section>
          <h2>Contact Us</h2>
          <p>
            If you have questions about this Privacy Policy, please contact us at:<br />
            privacy@cassieevents.com
          </p>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy; 