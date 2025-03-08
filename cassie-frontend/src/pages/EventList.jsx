// src/pages/EventList.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EventCard from '../components/EventCard';

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:3000/api/events')  // Adjust URL if needed
      .then(response => {
        setEvents(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching events:', error);
        setLoading(false);
      });
  }, []);

  const handleRegister = (id) => {
    // Trigger registration functionality (e.g., open a modal or redirect)
    alert(`Register for event ${id}`);
  };

  if (loading) return <p>Loading events...</p>;

  return (
    <div className="event-list container">
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

