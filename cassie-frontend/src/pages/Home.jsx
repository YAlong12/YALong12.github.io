// src/pages/Home.jsx
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

      <section className="features">
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
      </section>
    </div>
  );
};

export default Home;
