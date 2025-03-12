import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
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
  { title: 'Community Gatherings', img: communityImg },
  { title: 'Workshops & Classes', img: workshopsImg },
  { title: 'Entertainment & Arts', img: entertainmentImg },
  { title: 'Sports & Recreation', img: sportsImg },
  { title: 'Networking & Business', img: networkingImg },
  { title: 'Volunteer & Charity', img: volunteerImg },
  { title: 'Family & Kids', img: familyImg },
  { title: 'Food & Drink', img: foodImg },
  { title: 'Health & Wellness', img: healthImg },
  { title: 'Education & Talks', img: educationImg }
];

const Home = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleCategoryClick = (title) => {
    navigate(`/events?category=${encodeURIComponent(title)}`);
  };

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
        {!isAuthenticated && (
          <div className="hero-overlay">
            <h2>Join the Community</h2>
            <p>Sign up now and start discovering local events!</p>
            <Link to="/register" className="signup-button">Sign Up to Get Started</Link>
          </div>
        )}
      </section>

      {/* Event Categories Grid */}
      <section className="event-categories">
        <h2>Explore Events</h2>
        <div className="categories-grid">
          {eventCategories.map((cat, index) => (
            <div 
              key={index} 
              className="category-card"
              onClick={() => handleCategoryClick(cat.title)}
            >
              <img src={cat.img} alt={cat.title} />
              <div className="category-content">
                <h3>{cat.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="testimonial-section">
        <div className="testimonial-container">
          <div className="testimonial-content">
            <h2>Community Impact</h2>
            <div className="testimonial-text">
              "Cassie has transformed the way my family and I connect with our community in Gilbert. The platform makes it incredibly easy to discover and participate in local events."
            </div>
            <div className="testimonial-author">Cassie Mortensen</div>
            <div className="testimonial-role">Mother, Gilbert Resident</div>
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
