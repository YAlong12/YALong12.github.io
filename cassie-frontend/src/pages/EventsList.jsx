import React, { useState, useEffect } from "react";
import "./EventsList.css";

const EventsList = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      console.log('Fetching events...');
      const response = await fetch("http://localhost:3002/api/events");
      console.log('Response:', response);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log('Events data:', data);
      setEvents(data);
      setLoading(false);
    } catch (err) {
      console.error('Error details:', err);
      setError(`Failed to fetch events: ${err.message}`);
      setLoading(false);
    }
  };

  if (loading) return <div className="events-list">Loading events...</div>;
  if (error) return <div className="events-list">Error: {error}</div>;

  return (
    <div className="events-list">
      <h2>Upcoming Events</h2>
      {events.length === 0 ? (
        <p>No events available at the moment.</p>
      ) : (
        <div className="events-grid">
          {events.map((event) => (
            <div key={event._id} className="event-card">
              <h3>{event.title}</h3>
              <p>{event.description}</p>
              <div className="event-details">
                <span>📅 {new Date(event.date).toLocaleDateString()}</span>
                <span>📍 {event.location}</span>
                <span>🏷️ {event.category}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EventsList;
