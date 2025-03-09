// src/pages/EventsList.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './EventsList.css';

function EventsList() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/api/events')
      .then(response => setEvents(response.data))
      .catch(error => console.error('Error fetching events:', error));
  }, []);

  return (
    <div className="page-container">
      <h1>Upcoming Events</h1>
      <ul className="events-list">
        {events.map(event => (
          <li key={event.id} className="event-card">
            <h2>{event.title}</h2>
            <p>{event.date} | {event.location}</p>
            <Link to={`/events/${event.id}`} className="details-button">View Details</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EventsList;
