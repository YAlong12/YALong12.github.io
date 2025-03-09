import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import gilbertDowntown from '../assets/gilbert-downtown.png';

const Home = () => {
  return (
    <div className="home">
      {/* Welcome Section */}
      <section className="welcome">
        <h1>Welcome to Cassie</h1>
        <p>Discover and join exciting events in your community</p>
      </section>

      {/* Hero Image Section with Overlay */}
      <section className="hero-image">
        <img src={gilbertDowntown} alt="Downtown Gilbert" />
        <div className="hero-overlay">
          <h2>Join the Community</h2>
          <p>Sign up now and start discovering local events!</p>
          <Link to="/register" className="signup-button">Sign Up to Get Started</Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="feature-card">
          <h3>Local Events</h3>
          <p>Find events happening near you.</p>
        </div>
        <div className="feature-card">
          <h3>Activities</h3>
          <p>Join community activities and programs.</p>
        </div>
        <div className="feature-card">
          <h3>Sports</h3>
          <p>Stay updated with sports schedules.</p>
        </div>
      </section>
    </div>
  );
};

export default Home;
