import React from 'react';
import './StaticPages.css';

const TermsOfService = () => {
  return (
    <div className="static-page">
      <div className="static-page-content">
        <h1>Terms of Service</h1>
        
        <section>
          <p>Last updated: March 10, 2024</p>
          
          <h2>1. Agreement to Terms</h2>
          <p>
            By accessing or using Cassie's services, you agree to be bound by these Terms of Service 
            and our Privacy Policy. If you disagree with any part of the terms, you may not access 
            our service.
          </p>
        </section>

        <section>
          <h2>2. User Accounts</h2>
          <ul>
            <li>You must provide accurate and complete information when creating an account</li>
            <li>You are responsible for maintaining the security of your account</li>
            <li>You must notify us immediately of any unauthorized access</li>
            <li>We reserve the right to terminate accounts at our discretion</li>
          </ul>
        </section>

        <section>
          <h2>3. Event Listings</h2>
          <ul>
            <li>Events must be accurately described</li>
            <li>Organizers are responsible for event content and execution</li>
            <li>We reserve the right to remove inappropriate content</li>
            <li>We are not responsible for event outcomes</li>
          </ul>
        </section>

        <section>
          <h2>4. User Conduct</h2>
          <p>You agree not to:</p>
          <ul>
            <li>Use the service for any unlawful purpose</li>
            <li>Post false or misleading information</li>
            <li>Interfere with the proper operation of the service</li>
            <li>Attempt to gain unauthorized access</li>
          </ul>
        </section>

        <section>
          <h2>5. Limitation of Liability</h2>
          <p>
            We are not liable for any indirect, incidental, special, consequential, or punitive 
            damages arising from your use of our service.
          </p>
        </section>

        <section>
          <h2>Contact</h2>
          <p>
            Questions about these Terms should be sent to:<br />
            legal@cassieevents.com
          </p>
        </section>
      </div>
    </div>
  );
};

export default TermsOfService; 