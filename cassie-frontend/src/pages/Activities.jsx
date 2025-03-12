// src/pages/Activities.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../pages/EventsDropdown.css';

function Activities() {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/api/events?category=activities')
      .then(response => setActivities(response.data))
      .catch(error => console.error('Error fetching activities:', error));
  }, []);

  return (
    <div className="events-dropdown-container">
      <h1>Community Activities</h1>
      <ul className="events-list">
        {activities.map(activity => (
          <li key={activity._id} className="event-card">
            <h2>{activity.title}</h2>
            <p>{activity.date} | {activity.location}</p>
            <p>{activity.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Activities;
