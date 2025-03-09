// src/pages/SportsSchedules.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../pages/EventsDropdown.css';

function SportsSchedules() {
  const [schedules, setSchedules] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/api/events?category=sports-schedules')
      .then(response => setSchedules(response.data))
      .catch(error => console.error('Error fetching sports schedules:', error));
  }, []);

  return (
    <div className="events-dropdown-container">
      <h1>Sports Schedules</h1>
      <ul className="events-list">
        {schedules.map(schedule => (
          <li key={schedule._id} className="event-card">
            <h2>{schedule.title}</h2>
            <p>{schedule.date} | {schedule.location}</p>
            <p>{schedule.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SportsSchedules;
