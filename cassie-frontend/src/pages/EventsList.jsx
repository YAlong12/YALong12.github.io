import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './EventsList.css';

const EventsList = () => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    category: '',
    date: '',
    location: '',
    organizer: ''
  });
  const [sortBy, setSortBy] = useState('date');
  
  const location = useLocation();
  const category = new URLSearchParams(location.search).get('category');

  useEffect(() => {
    // Set initial category from URL if present
    if (category) {
      setFilters(prev => ({ ...prev, category }));
    }
    
    fetchEvents();
  }, [category]);

  const fetchEvents = async () => {
    try {
      const response = await fetch('/api/events');
      const data = await response.json();
      setEvents(data);
      setFilteredEvents(data);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  useEffect(() => {
    // Apply filters and search
    let result = [...events];

    // Apply search term
    if (searchTerm) {
      result = result.filter(event =>
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply filters
    if (filters.category) {
      result = result.filter(event => event.category === filters.category);
    }
    if (filters.location) {
      result = result.filter(event => event.location.includes(filters.location));
    }
    if (filters.date) {
      const filterDate = new Date(filters.date);
      result = result.filter(event => {
        const eventDate = new Date(event.date);
        return eventDate.toDateString() === filterDate.toDateString();
      });
    }
    if (filters.organizer) {
      result = result.filter(event => event.organizer.includes(filters.organizer));
    }

    // Apply sorting
    result.sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return new Date(a.date) - new Date(b.date);
        case 'title':
          return a.title.localeCompare(b.title);
        case 'location':
          return a.location.localeCompare(b.location);
        default:
          return 0;
      }
    });

    setFilteredEvents(result);
  }, [events, searchTerm, filters, sortBy]);

  return (
    <div className="events-list-container">
      <div className="search-filter-section">
        <h1>Events Search</h1>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search events..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="search-button">Search</button>
        </div>

        <div className="filters">
          <select
            value={filters.category}
            onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value }))}
          >
            <option value="">All Categories</option>
            <option value="community">Community Gatherings</option>
            <option value="workshops">Workshops & Classes</option>
            <option value="entertainment">Entertainment & Arts</option>
            <option value="sports">Sports & Recreation</option>
            <option value="networking">Networking & Business</option>
            <option value="volunteer">Volunteer & Charity</option>
            <option value="family">Family & Kids</option>
            <option value="food">Food & Drink</option>
            <option value="health">Health & Wellness</option>
            <option value="education">Education & Talks</option>
          </select>

          <input
            type="date"
            value={filters.date}
            onChange={(e) => setFilters(prev => ({ ...prev, date: e.target.value }))}
          />

          <input
            type="text"
            placeholder="Location..."
            value={filters.location}
            onChange={(e) => setFilters(prev => ({ ...prev, location: e.target.value }))}
          />

          <input
            type="text"
            placeholder="Organizer..."
            value={filters.organizer}
            onChange={(e) => setFilters(prev => ({ ...prev, organizer: e.target.value }))}
          />

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="date">Sort by Date</option>
            <option value="title">Sort by Title</option>
            <option value="location">Sort by Location</option>
          </select>
        </div>
      </div>

      <div className="events-grid">
        {filteredEvents.length > 0 ? (
          filteredEvents.map((event) => (
            <div key={event._id} className="event-card">
              <div className="event-image">
                <img src={event.image || '/default-event.jpg'} alt={event.title} />
              </div>
              <div className="event-info">
                <h3>{event.title}</h3>
                <p className="event-description">{event.description}</p>
                <div className="event-details">
                  <span>📅 {new Date(event.date).toLocaleDateString()}</span>
                  <span>📍 {event.location}</span>
                  <span>👥 {event.organizer}</span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="no-events">No events found matching your criteria.</p>
        )}
      </div>
    </div>
  );
};

export default EventsList;