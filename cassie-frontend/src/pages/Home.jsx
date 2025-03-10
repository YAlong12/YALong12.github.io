import React from 'react';
import { Link } from 'react-router-dom';
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
  { title: 'Community Gatherings', img: communityImg, link: '/events?category=Community Gatherings' },
  { title: 'Workshops & Classes', img: workshopsImg, link: '/events?category=Workshops & Classes' },
  { title: 'Entertainment & Arts', img: entertainmentImg, link: '/events?category=Entertainment & Arts' },
  { title: 'Sports & Recreation', img: sportsImg, link: '/events?category=Sports & Recreation' },
  { title: 'Networking & Business', img: networkingImg, link: '/events?category=Networking & Business' },
  { title: 'Volunteer & Charity', img: volunteerImg, link: '/events?category=Volunteer & Charity' },
  { title: 'Family & Kids', img: familyImg, link: '/events?category=Family & Kids' },
  { title: 'Food & Drink', img: foodImg, link: '/events?category=Food & Drink' },
  { title: 'Health & Wellness', img: healthImg, link: '/events?category=Health & Wellness' },
  { title: 'Education & Talks', img: educationImg, link: '/events?category=Education & Talks' }
];

const Home = () => {
  const { isAuthenticated } = useAuth();

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
          {eventCategories.map((category, index) => (
            <Link to={category.link} key={index} className="category-card">
              <img src={category.img} alt={category.title} />
              <div className="category-info">
                <h3>{category.title}</h3>
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
