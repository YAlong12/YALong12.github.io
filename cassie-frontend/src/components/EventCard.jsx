// src/components/EventCard.jsx
import React from 'react';
import './EventCard.css'; // Optional: create a CSS file for styling

const EventCard = ({ event, onRegister }) => {
  return (
    <div className="event-card">
      <h2>{event.title}</h2>
      <p>{event.description}</p>
      <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
      <p><strong>Location:</strong> {event.location}</p>
      <button onClick={() => onRegister(event.id)}>Register</button>
    </div>
  );
};

export default EventCard;
