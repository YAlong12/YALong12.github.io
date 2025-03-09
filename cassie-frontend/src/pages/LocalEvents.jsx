// src/pages/LocalEvents.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../pages/EventsDropdown.css';

function LocalEvents() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/api/events?category=local-events')
      .then(response => setEvents(response.data))
      .catch(error => console.error('Error fetching local events:', error));
  }, []);

  return (
    <div className="events-dropdown-container">
      <h1>Local Events</h1>
      <ul className="events-list">
        {events.map(event => (
          <li key={event._id} className="event-card">
            <h2>{event.title}</h2>
            <p>{event.date} | {event.location}</p>
            <p>{event.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default LocalEvents;
