// src/pages/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import { format, parseISO } from 'date-fns';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import './Dashboard.css';
import ConfirmDialog from '../components/ConfirmDialog';
import { fetchWithAuth } from '../utils/api';

const Dashboard = () => {
    const { user } = useAuth();
    const [savedEvents, setSavedEvents] = useState([]);
    const [registeredEvents, setRegisteredEvents] = useState([]);
    const [activeTab, setActiveTab] = useState('saved');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [userFavorites, setUserFavorites] = useState(new Set());
    const [userRegistrations, setUserRegistrations] = useState(new Set());
    const [actionFeedback, setActionFeedback] = useState(null);
    const [dialogState, setDialogState] = useState({
        isOpen: false,
        eventId: null,
        eventTitle: ''
    });

    const fetchUserEvents = async () => {
        if (!user) return;

        try {
            const [savedData, registeredData] = await Promise.all([
                fetchWithAuth('/users/saved-events'),
                fetchWithAuth('/users/registered-events')
            ]);

            console.log('Saved events:', savedData);
            console.log('Registered events:', registeredData);

            setUserFavorites(new Set(savedData.map(event => event._id || event.id)));
            setUserRegistrations(new Set(registeredData.map(event => event._id || event.id)));

            setSavedEvents(savedData);
            setRegisteredEvents(registeredData);
        } catch (err) {
            console.error('Error loading user data:', err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user) {
            fetchUserEvents();
        }
    }, [user]);

    const formatDate = (date, time) => {
        try {
            const dateTimeString = `${date.split('T')[0]}T${time}`;
            return format(parseISO(dateTimeString), 'EEEE, MMMM d, yyyy h:mm a');
        } catch (err) {
            return 'Invalid date';
        }
    };

    const handleUnregister = async (eventId) => {
        try {
            await fetchWithAuth(`/events/${eventId}/unregister`, {
                method: 'DELETE'
            });

            // Remove event from registered events
            setRegisteredEvents(prevEvents => 
                prevEvents.filter(event => (event.id || event._id) !== eventId)
            );

            setActionFeedback({
                message: 'Successfully unregistered from event',
                type: 'success'
            });

            setTimeout(() => {
                setActionFeedback({ message: '', type: '' });
            }, 3000);
        } catch (err) {
            console.error('Error unregistering:', err);
            setActionFeedback({
                message: 'Failed to unregister from event',
                type: 'error'
            });
        }
    };

    const handleConfirmUnregister = async () => {
        try {
            if (!dialogState.eventId) {
                throw new Error('No event ID provided');
            }

            const response = await fetchWithAuth(`/events/${dialogState.eventId}/register`, {
                method: 'DELETE'
            });

            if (response.isRegistered === false) {
                setRegisteredEvents(prev => 
                    prev.filter(event => (event._id || event.id) !== dialogState.eventId)
                );
                setActionFeedback({
                    message: (
                        <div className="feedback-content">
                            <span className="feedback-icon">✓</span>
                            <div className="feedback-text">
                                <strong>Event Unregistration Complete</strong>
                                <span>You can register again later</span>
                            </div>
                        </div>
                    ),
                    type: 'success'
                });
            }
        } catch (err) {
            console.error('Error unregistering:', err);
            setActionFeedback({
                message: (
                    <div className="feedback-content">
                        <span className="feedback-icon">×</span>
                        <div className="feedback-text">
                            <strong>Unregistration Failed</strong>
                            <span>Please try again</span>
                        </div>
                    </div>
                ),
                type: 'error'
            });
        } finally {
            setDialogState({ isOpen: false, eventId: null, eventTitle: '' });
            // Auto-dismiss success message after 3 seconds
            setTimeout(() => {
                setActionFeedback(null);
            }, 3000);
        }
    };

    const renderRegisteredEvents = () => {
        if (loading) {
            return <div key="loading" className="dashboard-loading">Loading...</div>;
        }

        if (error) {
            return <div key="error" className="dashboard-error">{error}</div>;
        }

        if (registeredEvents.length === 0) {
            return <div key="no-events" className="no-events">No registered events found</div>;
        }

        return registeredEvents.map(event => (
            <div key={event.id || event._id} className="event-card">
                <div className="event-header">
                    <h3>{event.title}</h3>
                    <span className="event-category">{event.category}</span>
                </div>
                <div className="event-details">
                    <p><strong>Date:</strong> {formatDate(event.startDate, event.startTime)}</p>
                    <p><strong>Location:</strong> {event.location}</p>
                    <p><strong>Department:</strong> {event.department}</p>
                    {event.contactInfo && (
                        <div className="event-contact">
                            <h4>Contact Information</h4>
                            {event.contactInfo.name && <p><strong>Name:</strong> {event.contactInfo.name}</p>}
                            {event.contactInfo.phone && <p><strong>Phone:</strong> {event.contactInfo.phone}</p>}
                            {event.contactInfo.email && <p><strong>Email:</strong> {event.contactInfo.email}</p>}
                        </div>
                    )}
                    <div className="event-actions">
                        <button 
                            className="view-details-button"
                            onClick={() => handleViewDetails(event)}
                        >
                            Details
                        </button>
                        <button 
                            className="unregister-button"
                            onClick={() => handleUnregister(event.id || event._id)}
                        >
                            Unregister
                        </button>
                    </div>
                </div>
            </div>
        ));
    };

    const renderSavedEvents = () => {
        if (savedEvents.length === 0) {
            return (
                <div key="no-saved-events" className="no-events">
                    <p>You haven't saved any events yet.</p>
                    <Link to="/events" className="browse-events-button">Browse Events</Link>
                </div>
            );
        }

        return savedEvents.map(event => (
            <div key={event._id || event.id} className="event-card">
                <div className="event-header">
                    <h3>{event.title}</h3>
                    <span className="event-category">{event.category}</span>
                </div>
                <div className="event-details">
                    <p><strong>Date:</strong> {formatDate(event.startDate, event.startTime)}</p>
                    <p><strong>Location:</strong> {event.location}</p>
                    <p><strong>Department:</strong> {event.department}</p>
                    {event.contactInfo && (
                        <div className="event-contact">
                            <h4>Contact Information</h4>
                            {event.contactInfo.name && <p><strong>Name:</strong> {event.contactInfo.name}</p>}
                            {event.contactInfo.phone && <p><strong>Phone:</strong> {event.contactInfo.phone}</p>}
                            {event.contactInfo.email && <p><strong>Email:</strong> {event.contactInfo.email}</p>}
                        </div>
                    )}
                    <div className="event-status">
                        <span className="saved-badge">❤️ Saved</span>
                    </div>
                </div>
            </div>
        ));
    };

    return (
        <div className="dashboard-container">
            <div className="dashboard-header">
                <h1>My Events</h1>
                <div className="dashboard-tabs">
                    <button 
                        className={`tab-button ${activeTab === 'saved' ? 'active' : ''}`}
                        onClick={() => setActiveTab('saved')}
                    >
                        Saved Events ({savedEvents.length})
                    </button>
                    <button 
                        className={`tab-button ${activeTab === 'registered' ? 'active' : ''}`}
                        onClick={() => setActiveTab('registered')}
                    >
                        Registered Events ({registeredEvents.length})
                    </button>
                </div>
            </div>

            <div className="events-grid">
                {activeTab === 'saved' ? renderSavedEvents() : renderRegisteredEvents()}
            </div>

            <ConfirmDialog 
                isOpen={dialogState.isOpen}
                message={`Are you sure you want to unregister from "${dialogState.eventTitle}"?`}
                onConfirm={handleConfirmUnregister}
                onCancel={() => setDialogState({ isOpen: false, eventId: null, eventTitle: '' })}
            />
            
            {actionFeedback && (
                <div className={`action-feedback ${actionFeedback.type}`}>
                    {actionFeedback.message}
                </div>
            )}
        </div>
    );
};

export default Dashboard;
