import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getApiUrl } from '../utils/api';
import './CreateEvent.css';

const CreateEvent = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        startDate: '',
        startTime: '',
        endDate: '',
        endTime: '',
        location: '',
        department: '',
        category: '',
        registrationRequired: false,
        registrationUrl: '',
        contactName: '',
        contactPhone: '',
        contactEmail: '',
        cost: '',
        ageGroup: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const departments = [
        'Parks and Recreation',
        'Police Department',
        'Fire Department',
        'Community Services',
        'Development Services',
        'Public Works',
        'Water Department'
    ];

    const categories = [
        'Arts & Culture',
        'Classes & Programs',
        'Community',
        'Council & Boards',
        'Parks & Recreation',
        'Public Safety',
        'Senior Activities',
        'Special Events',
        'Youth Programs'
    ];

    const ageGroups = [
        'All Ages',
        'Youth (0-12)',
        'Teens (13-17)',
        'Adults (18+)',
        'Seniors (55+)',
        'Family'
    ];

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('You must be logged in to create events');
            }

            // Format the data before sending
            const formattedData = {
                ...formData,
                contactInfo: {
                    name: formData.contactName,
                    phone: formData.contactPhone,
                    email: formData.contactEmail
                }
            };

            // Remove individual contact fields
            delete formattedData.contactName;
            delete formattedData.contactPhone;
            delete formattedData.contactEmail;

            console.log('Sending request:', {
                url: getApiUrl('/events'),
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token.substring(0, 10)}...`
                },
                data: formattedData
            });

            const response = await fetch(getApiUrl('/events'), {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(formattedData),
                credentials: 'include'
            });

            console.log('Response:', {
                status: response.status,
                statusText: response.statusText,
                headers: Object.fromEntries(response.headers.entries())
            });

            const contentType = response.headers.get('content-type');
            if (!contentType || !contentType.includes('application/json')) {
                console.error('Received non-JSON response:', contentType);
                throw new Error('Server returned non-JSON response');
            }

            const data = await response.json();
            console.log('Response data:', data);

            if (!response.ok) {
                throw new Error(data.message || 'Failed to create event');
            }

            console.log('Event created successfully:', data);
            navigate('/events');
        } catch (err) {
            console.error('Error creating event:', err);
            setError(err.message || 'An error occurred while creating the event');
        } finally {
            setLoading(false);
        }
    };

    if (!user?.isAdmin) {
        return <div>Unauthorized access</div>;
    }

    return (
        <div className="create-event-container">
            <h2>Create New Event</h2>
            {error && <div className="error-message">{error}</div>}
            <form onSubmit={handleSubmit} className="create-event-form">
                <div className="form-group">
                    <label>Event Title *</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                        placeholder="Enter event title"
                    />
                </div>

                <div className="form-group">
                    <label>Description *</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                        placeholder="Enter event description"
                    />
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label>Start Date *</label>
                        <input
                            type="date"
                            name="startDate"
                            value={formData.startDate}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Start Time *</label>
                        <input
                            type="time"
                            name="startTime"
                            value={formData.startTime}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label>End Date *</label>
                        <input
                            type="date"
                            name="endDate"
                            value={formData.endDate}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>End Time *</label>
                        <input
                            type="time"
                            name="endTime"
                            value={formData.endTime}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>

                <div className="form-group">
                    <label>Location *</label>
                    <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        required
                        placeholder="Enter event location"
                    />
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label>Department *</label>
                        <select
                            name="department"
                            value={formData.department}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select a department</option>
                            {departments.map(dept => (
                                <option key={dept} value={dept}>{dept}</option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Category *</label>
                        <select
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select a category</option>
                            {categories.map(cat => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label>Age Group *</label>
                        <select
                            name="ageGroup"
                            value={formData.ageGroup}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select age group</option>
                            {ageGroups.map(age => (
                                <option key={age} value={age}>{age}</option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Cost</label>
                        <input
                            type="text"
                            name="cost"
                            value={formData.cost}
                            onChange={handleChange}
                            placeholder="Free or enter amount"
                        />
                    </div>
                </div>

                <div className="form-group checkbox-group">
                    <label>
                        <input
                            type="checkbox"
                            name="registrationRequired"
                            checked={formData.registrationRequired}
                            onChange={handleChange}
                        />
                        Registration Required
                    </label>
                </div>

                {formData.registrationRequired && (
                    <div className="form-group">
                        <label>Registration URL</label>
                        <input
                            type="url"
                            name="registrationUrl"
                            value={formData.registrationUrl}
                            onChange={handleChange}
                            placeholder="Enter registration link"
                        />
                    </div>
                )}

                <div className="form-section">
                    <h3>Contact Information</h3>
                    <div className="form-row">
                        <div className="form-group">
                            <label>Contact Name</label>
                            <input
                                type="text"
                                name="contactName"
                                value={formData.contactName}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>Contact Phone</label>
                            <input
                                type="tel"
                                name="contactPhone"
                                value={formData.contactPhone}
                                onChange={handleChange}
                                placeholder="(480) 555-0123"
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Contact Email</label>
                        <input
                            type="email"
                            name="contactEmail"
                            value={formData.contactEmail}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <button type="submit" disabled={loading}>
                    {loading ? 'Creating Event...' : 'Create Event'}
                </button>
            </form>
        </div>
    );
};

export default CreateEvent; 