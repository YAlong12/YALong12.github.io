import React, { useState } from 'react';
import './RegistrationModal.css';

const RegistrationModal = ({ event, onClose, onSubmit, isLoading }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <div className="registration-form">
            <h2>Register for {event.title}</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Phone</label>
                    <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        required
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
    );
};

export default RegistrationModal; 