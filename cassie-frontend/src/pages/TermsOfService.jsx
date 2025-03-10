import React from 'react';
import './StaticPages.css';

const TermsOfService = () => {
  return (
    <div className="static-page">
      <div className="static-page-content">
        <h1>Terms of Service</h1>
        <p className="last-updated">Last Updated: March 10, 2024</p>

        <section>
          <h2>1. Acceptance of Terms</h2>
          <p>
            By accessing and using Cassie, you agree to be bound by these Terms of Service 
            and all applicable laws and regulations.
          </p>
        </section>

        <section>
          <h2>2. User Accounts</h2>
          <p>
            You are responsible for maintaining the confidentiality of your account 
            credentials and for all activities under your account.
          </p>
        </section>

        <section>
          <h2>3. Event Registration</h2>
          <p>
            When registering for events through our platform:
          </p>
          <ul>
            <li>You agree to provide accurate registration information</li>
            <li>You understand that registration is subject to availability</li>
            <li>You agree to follow event-specific rules and guidelines</li>
          </ul>
        </section>

        <section>
          <h2>4. Prohibited Activities</h2>
          <p>
            Users may not:
          </p>
          <ul>
            <li>Use the platform for unlawful purposes</li>
            <li>Impersonate others</li>
            <li>Interfere with the platform's operation</li>
            <li>Share false or misleading information</li>
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