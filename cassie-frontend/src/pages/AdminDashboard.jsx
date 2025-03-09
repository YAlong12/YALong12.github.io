// src/pages/AdminDashboard.jsx
import React, { useState } from 'react';
import axios from 'axios';
import '../pages/AdminDashboard.css';

function AdminDashboard() {
  const [eventData, setEventData] = useState({
    title: '',
    description: '',
    date: '',
    location: '',
    category: ''
  });

  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setEventData({ ...eventData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    setError(null);

    try {
        await axios.post('http://localhost:3000/api/events', eventData); // ✅ No need to assign response
        setMessage('Event added successfully!');
        setEventData({ title: '', description: '', date: '', location: '', category: '' });
    } catch (err) {
        setError('Error adding event. Please try again.');
        console.error(err);
    }
};

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard - Add Event</h1>
      {message && <p className="success">{message}</p>}
      {error && <p className="error">{error}</p>}

      <form onSubmit={handleSubmit} className="event-form">
        <label>Title:</label>
        <input type="text" name="title" value={eventData.title} onChange={handleChange} required />

        <label>Description:</label>
        <textarea name="description" value={eventData.description} onChange={handleChange} required />

        <label>Date:</label>
        <input type="date" name="date" value={eventData.date} onChange={handleChange} required />

        <label>Location:</label>
        <input type="text" name="location" value={eventData.location} onChange={handleChange} required />

        <label>Category:</label>
        <select name="category" value={eventData.category} onChange={handleChange} required>
          <option value="">Select Category</option>
          <option value="activities">Activities</option>
          <option value="local-events">Local Events</option>
          <option value="sports-schedules">Sports Schedules</option>
        </select>

        <button type="submit">Add Event</button>
      </form>
    </div>
  );
}

export default AdminDashboard;
