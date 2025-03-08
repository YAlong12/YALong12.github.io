// src/pages/EventList.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EventCard from '../components/EventCard';
import RegistrationForm from '../components/RegistrationForm';

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:3000/api/events')
      .then(response => {
        setEvents(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching events:', error);
        setLoading(false);
      });
  }, []);

  const handleRegister = (eventId) => {
    setSelectedEvent(eventId);
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
    setSelectedEvent(null);
  };

  const handleFormSubmit = (data) => {
    // Here you would post data to your backend API
    console.log('Registration data submitted:', data);
    alert(`Registered for event ${data.eventId}`);
    handleFormClose();
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
      {showForm && (
        <RegistrationForm
          eventId={selectedEvent}
          onClose={handleFormClose}
          onSubmit={handleFormSubmit}
        />
      )}
    </div>
  );
};

export default EventList;
