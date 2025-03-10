import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { fetchWithAuth } from '../utils/api';
import RegistrationModal from '../components/RegistrationModal';
import './EventDetails.css';
import defaultEventImage from '../assets/default-event.jpg';

const EventDetails = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showRegistrationModal, setShowRegistrationModal] = useState(false);
    const [isRegistered, setIsRegistered] = useState(false);

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const data = await fetchWithAuth(`/events/${id}`);
                setEvent(data);
                setIsRegistered(data.registeredUsers?.includes(user?.userId));
            } catch (err) {
                setError('Failed to load event details');
                console.error('Error fetching event:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchEvent();
    }, [id]);

    const handleRegister = () => {
        if (!user) {
            navigate('/login');
            return;
        }
        setShowRegistrationModal(true);
    };

    const handleUnregister = async () => {
        try {
            await fetchWithAuth(`/events/${id}/unregister`, {
                method: 'DELETE'
            });
            setIsRegistered(false);
        } catch (err) {
            console.error('Error unregistering:', err);
        }
    };

    if (loading) return <div className="loading">Loading...</div>;
    if (error) return <div className="error">{error}</div>;
    if (!event) return <div className="error">Event not found</div>;

    return (
        <div className="event-details-page">
            <div className="event-details-container">
                <img 
                    src={event.imageUrl || defaultEventImage}
                    alt={event.title}
                    className="event-details-image"
                    onError={(e) => {
                        e.target.src = defaultEventImage;
                        e.target.onerror = null;
                    }}
                />
                
                <div className="event-details-content">
                    <h1>{event.title}</h1>
                    
                    <div className="event-details-info">
                        <div className="info-item">
                            <span className="label">Date:</span>
                            <span>{new Date(event.startDate).toLocaleDateString()}</span>
                        </div>
                        <div className="info-item">
                            <span className="label">Time:</span>
                            <span>{event.startTime} - {event.endTime}</span>
                        </div>
                        <div className="info-item">
                            <span className="label">Location:</span>
                            <span>{event.location}</span>
                        </div>
                        <div className="info-item">
                            <span className="label">Department:</span>
                            <span>{event.department}</span>
                        </div>
                        <div className="info-item">
                            <span className="label">Category:</span>
                            <span>{event.category}</span>
                        </div>
                        <div className="info-item">
                            <span className="label">Age Group:</span>
                            <span>{event.ageGroup}</span>
                        </div>
                        <div className="info-item">
                            <span className="label">Cost:</span>
                            <span>{event.cost || 'Free'}</span>
                        </div>
                    </div>

                    <div className="event-description">
                        <h2>Description</h2>
                        <p>{event.description}</p>
                    </div>

                    {event.contactInfo && (
                        <div className="event-contact-info">
                            <h2>Contact Information</h2>
                            {event.contactInfo.name && <p><strong>Name:</strong> {event.contactInfo.name}</p>}
                            {event.contactInfo.phone && <p><strong>Phone:</strong> {event.contactInfo.phone}</p>}
                            {event.contactInfo.email && <p><strong>Email:</strong> {event.contactInfo.email}</p>}
                        </div>
                    )}

                    {/* Show registration buttons only for non-admin users */}
                    {user && !user.isAdmin && (
                        <div className="event-registration-actions">
                            {isRegistered ? (
                                <button 
                                    className="unregister-button"
                                    onClick={handleUnregister}
                                >
                                    Unregister
                                </button>
                            ) : (
                                <button 
                                    className="register-button"
                                    onClick={handleRegister}
                                >
                                    Register Now
                                </button>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {showRegistrationModal && (
                <RegistrationModal
                    event={event}
                    onClose={() => setShowRegistrationModal(false)}
                    onSubmit={async (formData) => {
                        try {
                            await fetchWithAuth(`/events/${id}/register`, {
                                method: 'POST',
                                body: JSON.stringify(formData)
                            });
                            setIsRegistered(true);
                            setShowRegistrationModal(false);
                        } catch (err) {
                            console.error('Error registering:', err);
                        }
                    }}
                />
            )}
        </div>
    );
};

export default EventDetails; 