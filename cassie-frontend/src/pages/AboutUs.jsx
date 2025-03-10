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
            Cassie is dedicated to bringing the Gilbert community together by making it easier 
            to discover, organize, and participate in local events. We believe that strong 
            communities are built through shared experiences and meaningful connections.
          </p>
        </section>

        <section>
          <h2>Our Story</h2>
          <p>
            Founded in Gilbert, Arizona, Cassie was created to address the need for a 
            centralized platform where residents could easily find and engage with community 
            events. Our platform serves as a bridge between event organizers and community 
            members, fostering a more connected and vibrant Gilbert.
          </p>
        </section>

        <section>
          <h2>What We Do</h2>
          <p>
            We provide a user-friendly platform that:
          </p>
          <ul>
            <li>Connects residents with local events and activities</li>
            <li>Helps event organizers reach their target audience</li>
            <li>Streamlines the event registration process</li>
            <li>Promotes community engagement and participation</li>
            <li>Supports local initiatives and organizations</li>
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