import React from 'react';
import './StaticPages.css';

const AboutUs = () => {
  return (
    <div className="static-page">
      <div className="static-page-content">
        <h1>About Us</h1>
        
        <section>
          <h2>Our Mission</h2>
          <p>
            Cassie is dedicated to connecting the Gilbert community through meaningful events and activities. 
            We strive to make it easier for residents to discover, participate in, and organize local events 
            that enrich our community life.
          </p>
        </section>

        <section>
          <h2>Our Story</h2>
          <p>
            Founded in Gilbert, Arizona, Cassie was born from a simple idea: to create a central hub where 
            community members can easily find and engage with local events. Our platform brings together 
            various organizations, departments, and individuals who contribute to making Gilbert a vibrant 
            and active community.
          </p>
        </section>

        <section>
          <h2>What We Do</h2>
          <p>
            We provide a user-friendly platform that:
          </p>
          <ul>
            <li>Connects residents with local events and activities</li>
            <li>Helps organizations reach their target audience</li>
            <li>Facilitates community engagement and participation</li>
            <li>Promotes local initiatives and gatherings</li>
            <li>Supports the growth of our community</li>
          </ul>
        </section>

        <section>
          <h2>Contact Us</h2>
          <p>
            Have questions or suggestions? We'd love to hear from you!<br />
            Email: contact@cassieevents.com<br />
            Phone: (480) 555-0123
          </p>
        </section>
      </div>
    </div>
  );
};

export default AboutUs; 