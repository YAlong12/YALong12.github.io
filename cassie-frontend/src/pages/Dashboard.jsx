// src/pages/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import './Dashboard.css';

const Dashboard = () => {
  const [savedEvents, setSavedEvents] = useState([]);
  const [registeredEvents, setRegisteredEvents] = useState([]);
  const [activeTab, setActiveTab] = useState('saved');

  useEffect(() => {
    fetchUserEvents();
  }, []);

  const fetchUserEvents = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/user/events', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      setSavedEvents(data.savedEvents);
      setRegisteredEvents(data.registeredEvents);
    } catch (error) {
      console.error('Error fetching user events:', error);
    }
  };

  return (
    <div className="dashboard">
      <h1>My Dashboard</h1>
      
      <div className="dashboard-tabs">
        <button 
          className={`tab-button ${activeTab === 'saved' ? 'active' : ''}`}
          onClick={() => setActiveTab('saved')}
        >
          Saved Events
        </button>
        <button 
          className={`tab-button ${activeTab === 'registered' ? 'active' : ''}`}
          onClick={() => setActiveTab('registered')}
        >
          Registered Events
        </button>
      </div>

      <div className="events-grid">
        {activeTab === 'saved' ? (
          savedEvents.length > 0 ? (
            savedEvents.map(event => (
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
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="no-events">No saved events yet.</p>
          )
        ) : (
          registeredEvents.length > 0 ? (
            registeredEvents.map(event => (
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
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="no-events">No registered events yet.</p>
          )
        )}
      </div>
    </div>
  );
};

export default Dashboard;
