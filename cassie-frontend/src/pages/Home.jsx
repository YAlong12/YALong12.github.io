import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import gilbertDowntown from '../assets/gilbert-downtown.png';
import testimonialImg from '../assets/testimonial.jpg';

// Sample images for categories (replace with real ones)
import communityImg from '../assets/community.jpg';
import workshopsImg from '../assets/workshops.jpg';
import entertainmentImg from '../assets/entertainment.jpg';
import sportsImg from '../assets/sports.jpg';
import networkingImg from '../assets/networking.jpg';
import volunteerImg from '../assets/volunteer.jpg';
import familyImg from '../assets/family.jpg';
import foodImg from '../assets/food.jpg';
import healthImg from '../assets/health.jpg';
import educationImg from '../assets/education.jpg';

const eventCategories = [
  { title: 'Community Gatherings', img: communityImg, description: 'Festivals, town hall meetings, block parties', link: '/events?category=community' },
  { title: 'Workshops & Classes', img: workshopsImg, description: 'Art, coding, fitness, cooking, and more', link: '/events?category=workshops' },
  { title: 'Entertainment & Arts', img: entertainmentImg, description: 'Concerts, theater, movie nights, comedy shows', link: '/events?category=entertainment' },
  { title: 'Sports & Recreation', img: sportsImg, description: 'Local leagues, yoga in the park, group hikes', link: '/events?category=sports' },
  { title: 'Networking & Business', img: networkingImg, description: 'Meetups, conferences, career fairs', link: '/events?category=networking' },
  { title: 'Volunteer & Charity', img: volunteerImg, description: 'Fundraisers, clean-ups, donation drives', link: '/events?category=volunteer' },
  { title: 'Family & Kids', img: familyImg, description: 'Storytime, kids activities, family fun days', link: '/events?category=family' },
  { title: 'Food & Drink', img: foodImg, description: 'Farmers markets, food festivals, wine tastings', link: '/events?category=food' },
  { title: 'Health & Wellness', img: healthImg, description: 'Meditation, health fairs, fitness challenges', link: '/events?category=health' },
  { title: 'Education & Talks', img: educationImg, description: 'Lectures, book clubs, panel discussions', link: '/events?category=education' }
];

const Home = () => {
  return (
    <div className="home">
      {/* Welcome Section */}
      <section className="welcome">
        <h1>Welcome to Cassie</h1>
        <p>Discover and join exciting events in your community</p>
      </section>

      {/* Hero Image Section */}
      <section className="hero-image">
        <img src={gilbertDowntown} alt="Downtown Gilbert" />
        <div className="hero-overlay">
          <h2>Join the Community</h2>
          <p>Sign up now and start discovering local events!</p>
          <Link to="/register" className="signup-button">Sign Up to Get Started</Link>
        </div>
      </section>

      {/* Event Categories Grid */}
      <section className="event-categories">
        <h2>Explore Events</h2>
        <div className="categories-grid">
          {eventCategories.map((category, index) => (
            <Link to={category.link} key={index} className="category-card">
              <img src={category.img} alt={category.title} />
              <div className="category-info">
                <h3>{category.title}</h3>
                <p>{category.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="testimonial-section">
        <div className="testimonial-container">
          <div className="testimonial-content">
            <h2>Community Impact</h2>
            <div className="testimonial-text">
              "Cassie has transformed how we connect with our community in Gilbert. The platform makes it incredibly easy to discover and participate in local events. It's become an essential part of our town's social fabric."
            </div>
            <div className="testimonial-author">Brian Johnson</div>
            <div className="testimonial-role">Community Organizer, Gilbert Events Board</div>
          </div>
          <div className="testimonial-image">
            <img src={testimonialImg} alt="Community event in Gilbert" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
