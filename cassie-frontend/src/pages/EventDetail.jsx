// src/pages/EventDetail.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './EventDetail.css';

function EventDetail() {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:3000/api/events/${eventId}`)
      .then(response => setEvent(response.data))
      .catch(error => console.error('Error fetching event details:', error));
  }, [eventId]);

  if (!event) return <p>Loading event details...</p>;

  return (
    <div className="page-container">
      <h1>{event.title}</h1>
      <p><strong>Date:</strong> {event.date}</p>
      <p><strong>Location:</strong> {event.location}</p>
      <p>{event.description}</p>
      <button className="register-button">Register</button>
    </div>
  );
}

export default EventDetail;
