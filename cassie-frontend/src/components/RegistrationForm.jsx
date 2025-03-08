// src/components/RegistrationForm.jsx
import React, { useState } from 'react';
import './RegistrationForm.css';

const RegistrationForm = ({ eventId, onClose, onSubmit }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Pass registration data to a parent component or call API here
    onSubmit({ eventId, name, email });
  };

  return (
    <div className="registration-form-overlay">
      <div className="registration-form-container">
        <button className="close-btn" onClick={onClose}>X</button>
        <h2>Register for Event</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input 
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>
          <label>
            Email:
            <input 
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <button type="submit" className="btn">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;
