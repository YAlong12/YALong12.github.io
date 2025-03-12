import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { fetchWithAuth } from '../utils/api';
import './CreateEvent.css'; // We'll reuse the create event styles

const EditEvent = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
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

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                if (!id || !id.match(/^[0-9a-fA-F]{24}$/)) {
                    throw new Error('Invalid event ID');
                }

                console.log('Fetching event with ID:', id);
                const event = await fetchWithAuth(`/events/${id}`);
                console.log('Received event:', event);
                
                if (!event) {
                    throw new Error('Event not found');
                }

                // Format dates for input fields
                const startDate = event.startDate ? event.startDate.split('T')[0] : '';
                const endDate = event.endDate ? event.endDate.split('T')[0] : '';

                setFormData({
                    ...event,
                    startDate,
                    endDate,
                    contactName: event.contactInfo?.name || '',
                    contactPhone: event.contactInfo?.phone || '',
                    contactEmail: event.contactInfo?.email || ''
                });
            } catch (err) {
                console.error('Error fetching event:', err);
                setError(err.message || 'Failed to load event details');
                navigate('/events'); // Redirect on error
            } finally {
                setLoading(false);
            }
        };

        fetchEvent();
    }, [id, navigate]);

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
            const formattedData = {
                ...formData,
                contactInfo: {
                    name: formData.contactName,
                    phone: formData.contactPhone,
                    email: formData.contactEmail
                }
            };

            // Remove fields that shouldn't be sent
            delete formattedData.contactName;
            delete formattedData.contactPhone;
            delete formattedData.contactEmail;

            const response = await fetchWithAuth(`/events/${id}`, {
                method: 'PUT',
                body: JSON.stringify(formattedData)
            });

            console.log('Event updated:', response);
            navigate('/events');
        } catch (err) {
            console.error('Error updating event:', err);
            setError(err.message || 'Failed to update event');
        } finally {
            setLoading(false);
        }
    };

    if (!user?.isAdmin) {
        return <div className="unauthorized">Unauthorized access</div>;
    }

    if (loading) {
        return <div className="loading">Loading event details...</div>;
    }

    return (
        <div className="create-event-container">
            <h2>Edit Event</h2>
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
                    />
                </div>

                <div className="form-group">
                    <label>Description *</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
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

                <div className="form-actions">
                    <button type="button" onClick={() => navigate('/events')} className="cancel-button">
                        Cancel
                    </button>
                    <button type="submit" disabled={loading} className="submit-button">
                        {loading ? 'Saving Changes...' : 'Save Changes'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditEvent; 