import React from 'react';
import './StaticPages.css';

const PrivacyPolicy = () => {
  return (
    <div className="static-page">
      <div className="static-page-content">
        <h1>Privacy Policy</h1>
        <p className="last-updated">Last Updated: March 10, 2024</p>

        <section>
          <h2>Information We Collect</h2>
          <p>We collect information that you provide directly to us, including:</p>
          <ul>
            <li>Name and contact information</li>
            <li>Account credentials</li>
            <li>Event registration details</li>
            <li>Communication preferences</li>
          </ul>
        </section>

        <section>
          <h2>How We Use Your Information</h2>
          <p>We use the information we collect to:</p>
          <ul>
            <li>Provide and maintain our services</li>
            <li>Process event registrations</li>
            <li>Send notifications about events</li>
            <li>Improve our platform</li>
            <li>Comply with legal obligations</li>
          </ul>
        </section>

        <section>
          <h2>Information Sharing</h2>
          <p>
            We do not sell your personal information. We may share your information with:
          </p>
          <ul>
            <li>Event organizers for registration purposes</li>
            <li>Service providers who assist in our operations</li>
            <li>Law enforcement when required by law</li>
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