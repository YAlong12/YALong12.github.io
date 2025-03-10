import React, { useState } from 'react';
import './RegistrationModal.css';

const RegistrationModal = ({ event, onClose, onSubmit, isLoading }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        specialRequirements: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-header">
                    <h2>Register for {event.title}</h2>
                    <button className="close-button" onClick={onClose}>×</button>
                </div>
                
                <div className="modal-body">
                    <div className="event-summary">
                        <p><strong>Date:</strong> {event.startDate}</p>
                        <p><strong>Time:</strong> {event.startTime}</p>
                        <p><strong>Location:</strong> {event.location}</p>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="name">Full Name *</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">Email Address *</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="phone">Phone Number *</label>
                            <input
                                type="tel"
                                id="phone"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="specialRequirements">Special Requirements</label>
                            <textarea
                                id="specialRequirements"
                                name="specialRequirements"
                                value={formData.specialRequirements}
                                onChange={handleChange}
                                placeholder="Any special requirements or accommodations needed?"
                            />
                        </div>

                        <div className="form-actions">
                            <button type="button" onClick={onClose} className="cancel-button">
                                Cancel
                            </button>
                            <button type="submit" disabled={isLoading} className="submit-button">
                                {isLoading ? 'Registering...' : 'Complete Registration'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default RegistrationModal; 