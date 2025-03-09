import React, { useState, useEffect } from 'react';
import axios from 'axios';

function EventsList() {
  const [events, setEvents] = useState([]);
  const [message, setMessage] = useState(null);
  const token = localStorage.getItem('token');

  useEffect(() => {
    axios.get('http://localhost:3000/api/events')
      .then(response => setEvents(response.data))
      .catch(error => console.error("Error fetching events:", error));
  }, []);

  const registerForEvent = async (eventId) => {
    try {
      await axios.post(`http://localhost:3000/api/events/${eventId}/register`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessage('Successfully registered for event!');
    } catch (error) {
      setMessage('Error registering. Please log in.');
    }
  };

  return (
    <div className="events-container">
      <h1>Upcoming Events</h1>
      {message && <p className="success">{message}</p>}
      <ul className="events-list">
        {events.map(event => (
          <li key={event._id} className="event-card">
            <h2>{event.title}</h2>
            <p>{event.date} | {event.location}</p>
            <p>{event.description}</p>
            {token && <button onClick={() => registerForEvent(event._id)}>Register</button>}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EventsList;
