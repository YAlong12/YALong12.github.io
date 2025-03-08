// src/pages/EventList.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EventCard from '../components/EventCard';

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch events from your back-end API
  useEffect(() => {
    axios.get('http://localhost:3000/api/events')
      .then(response => {
        setEvents(response.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching events:', err);
        setError(err);
        setLoading(false);
      });
  }, []);

  const handleRegister = (eventId) => {
    // Add registration logic here (e.g., open a modal or navigate to a registration form)
    alert(`Register for event ${eventId}`);
  };

  if (loading) return <p>Loading events...</p>;
  if (error) return <p>Error loading events.</p>;

  return (
    <div className="event-list">
      <h1>Upcoming Events</h1>
      {events.length === 0 ? (
        <p>No events available at the moment.</p>
      ) : (
        events.map(event => (
          <EventCard key={event.id || event._id} event={event} onRegister={handleRegister} />
        ))
      )}
    </div>
  );
};

export default EventList;
