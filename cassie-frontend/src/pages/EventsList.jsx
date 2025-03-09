import React from 'react';
import './Home.css';

const Home = () => {
  return (
    <div className="home">
      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to Cassie</h1>
          <p>Discover and join exciting events in your community</p>
        </div>
      </section>

      {/* White Background for Feature Cards */}
      <section className="features-container">
        <div className="features">
          <div className="feature-card">
            <h3>Local Events</h3>
            <p>Find events happening near you</p>
          </div>
          <div className="feature-card">
            <h3>Activities</h3>
            <p>Join community activities and programs</p>
          </div>
          <div className="feature-card">
            <h3>Sports</h3>
            <p>Stay updated with sports schedules</p>
          </div>
        </div>
      </section>

      {/* Background Image Section */}
      <section className="image-section">
        <div className="image-overlay">
          <h2>Experience Gilbert</h2>
          <p>Explore vibrant events, activities, and more</p>
        </div>
      </section>
    </div>
  );
};

export default Home;
