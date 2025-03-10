import React, { useState, useEffect } from 'react';
import { format, parseISO } from 'date-fns';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import './EventsList.css';
import { fetchWithAuth } from '../utils/api';
import RegistrationModal from '../components/RegistrationModal';

const EventsList = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filter, setFilter] = useState({
        department: '',
        category: '',
        ageGroup: '',
        date: ''
    });
    const [userFavorites, setUserFavorites] = useState(new Set());
    const [userRegistrations, setUserRegistrations] = useState(new Set());
    const [actionFeedback, setActionFeedback] = useState({ message: '', type: '' });
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [isRegistering, setIsRegistering] = useState(false);

    useEffect(() => {
        fetchEvents();
    }, []);

    useEffect(() => {
        const loadUserData = async () => {
            if (!user) return;

            try {
                const [savedResponse, registeredResponse] = await Promise.all([
                    fetchWithAuth('/users/saved-events'),
                    fetchWithAuth('/users/registered-events')
                ]);

                setUserFavorites(new Set(savedResponse.map(event => event.id || event._id)));
                setUserRegistrations(new Set(registeredResponse.map(event => event.id || event._id)));
            } catch (err) {
                console.error('Error loading user data:', err);
                setActionFeedback({
                    message: 'Failed to load user data',
                    type: 'error'
                });
            }
        };

        loadUserData();
    }, [user]);

    const fetchEvents = async () => {
        try {
            const data = await fetchWithAuth('/events');
            setEvents(data);
        } catch (err) {
            setError('Failed to load events');
            console.error('Error fetching events:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (eventId) => {
        if (!window.confirm('Are you sure you want to delete this event?')) return;
        
        try {
            const response = await fetch(`http://localhost:3002/api/events/${eventId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (!response.ok) throw new Error('Failed to delete event');
            
            // Remove event from state
            setEvents(events.filter(event => event._id !== eventId));
        } catch (err) {
            console.error('Error deleting event:', err);
            alert('Failed to delete event');
        }
    };

    const handleFavorite = async (eventId) => {
        if (!user) {
            navigate('/login');
            return;
        }

        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('No authentication token found');
            }

            console.log('Attempting to favorite event:', eventId);

            // Make sure we're using the correct ID
            const id = eventId?.id || eventId?._id || eventId;
            if (!id) {
                throw new Error('Invalid event ID');
            }

            const response = await fetch(`http://localhost:3002/api/events/${id}/favorite`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            console.log('Response status:', response.status);
            const data = await response.json();
            console.log('Response data:', data);

            if (!response.ok) {
                throw new Error(data.message || 'Failed to update favorites');
            }

            // Update the favorites set based on the response
            setUserFavorites(prev => {
                const newFavorites = new Set(prev);
                if (data.isFavorited) {
                    newFavorites.add(id);
                    setActionFeedback({ 
                        message: 'Event added to favorites!', 
                        type: 'success' 
                    });
                } else {
                    newFavorites.delete(id);
                    setActionFeedback({ 
                        message: 'Event removed from favorites', 
                        type: 'info' 
                    });
                }
                return newFavorites;
            });

            setTimeout(() => setActionFeedback({ message: '', type: '' }), 3000);
        } catch (err) {
            console.error('Error favoriting event:', err);
            setActionFeedback({ 
                message: err.message || 'Failed to update favorites', 
                type: 'error' 
            });
        }
    };

    const handleRegister = async (eventId) => {
        if (!user) {
            navigate('/login');
            return;
        }

        const event = events.find(e => (e.id || e._id) === eventId);
        if (!event) {
            setActionFeedback({
                message: 'Event not found',
                type: 'error'
            });
            return;
        }

        setSelectedEvent(event);
    };

    const handleRegistrationSubmit = async (formData) => {
        try {
            setIsRegistering(true);
            const response = await fetchWithAuth(`/events/${selectedEvent.id || selectedEvent._id}/register`, {
                method: 'POST',
                body: JSON.stringify(formData)
            });

            if (response.isRegistered) {
                setUserRegistrations(prev => new Set([...prev, selectedEvent.id || selectedEvent._id]));
                setActionFeedback({
                    message: 'Successfully registered for event!',
                    type: 'success'
                });
                setSelectedEvent(null);
            }
        } catch (err) {
            setActionFeedback({
                message: err.message || 'Failed to register for event',
                type: 'error'
            });
        } finally {
            setIsRegistering(false);
        }
    };

    const formatDate = (date, time) => {
        try {
            // Handle different date formats
            let dateString = date;
            if (typeof date === 'string') {
                // If date includes time information, extract just the date part
                if (date.includes('T')) {
                    dateString = date.split('T')[0];
                }
            }

            // Combine date and time
            const dateTimeString = `${dateString}T${time}`;
            
            // Parse the ISO string
            const dateObj = parseISO(dateTimeString);
            
            // Check if date is valid
            if (isNaN(dateObj.getTime())) {
                return 'Invalid date';
            }

            return format(dateObj, 'EEEE, MMMM d, yyyy h:mm a');
        } catch (err) {
            console.error('Error formatting date:', err, { date, time });
            return 'Invalid date';
        }
    };

    const filteredEvents = events.filter(event => {
        const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            event.location.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesDepartment = !filter.department || event.department === filter.department;
        const matchesCategory = !filter.category || event.category === filter.category;
        const matchesAgeGroup = !filter.ageGroup || event.ageGroup === filter.ageGroup;

        return matchesSearch && matchesDepartment && matchesCategory && matchesAgeGroup;
    });

    if (loading) return <div className="events-loading">Loading events...</div>;
    if (error) return <div className="events-error">{error}</div>;

    return (
        <div className="events-page">
            {actionFeedback.message && (
                <div className={`action-feedback ${actionFeedback.type}`}>
                    {actionFeedback.message}
                </div>
            )}
            <div className="events-header">
                <h1>
                    Community Events
                    {/* {user?.isAdmin && (
                        <Link to="/events/create" className="create-event-button">
                            Create New Event
                        </Link>
                    )} */}
                </h1>
                
                <div className="search-filter-section">
                    <div className="search-bar">
                        <input
                            type="text"
                            placeholder="Search events by title, description, or location..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <div className="filters">
                        <div className="filter-group">
                            <label className="filter-label">Department</label>
                            <select 
                                value={filter.department} 
                                onChange={(e) => setFilter({...filter, department: e.target.value})}
                            >
                                <option value="">All Departments</option>
                                <option value="Parks and Recreation">Parks and Recreation</option>
                                <option value="Police Department">Police Department</option>
                                <option value="Fire Department">Fire Department</option>
                                <option value="Community Services">Community Services</option>
                                <option value="Development Services">Development Services</option>
                                <option value="Public Works">Public Works</option>
                                <option value="Water Department">Water Department</option>
                            </select>
                        </div>

                        <div className="filter-group">
                            <label className="filter-label">Category</label>
                            <select 
                                value={filter.category} 
                                onChange={(e) => setFilter({...filter, category: e.target.value})}
                            >
                                <option value="">All Categories</option>
                                <option value="Arts & Culture">Arts & Culture</option>
                                <option value="Classes & Programs">Classes & Programs</option>
                                <option value="Community">Community</option>
                                <option value="Council & Boards">Council & Boards</option>
                                <option value="Parks & Recreation">Parks & Recreation</option>
                                <option value="Public Safety">Public Safety</option>
                                <option value="Senior Activities">Senior Activities</option>
                                <option value="Special Events">Special Events</option>
                                <option value="Youth Programs">Youth Programs</option>
                            </select>
                        </div>

                        <div className="filter-group">
                            <label className="filter-label">Age Group</label>
                            <select 
                                value={filter.ageGroup} 
                                onChange={(e) => setFilter({...filter, ageGroup: e.target.value})}
                            >
                                <option value="">All Age Groups</option>
                                <option value="All Ages">All Ages</option>
                                <option value="Youth (0-12)">Youth (0-12)</option>
                                <option value="Teens (13-17)">Teens (13-17)</option>
                                <option value="Adults (18+)">Adults (18+)</option>
                                <option value="Seniors (55+)">Seniors (55+)</option>
                                <option value="Family">Family</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            <div className="events-list">
                {filteredEvents.length === 0 ? (
                    <div className="no-events">No events found</div>
                ) : (
                    filteredEvents.map(event => (
                        <div key={event._id} className="event-card">
                            <div className="event-header">
                                <h2>{event.title}</h2>
                                <div className="event-actions">
                                    {user && (
                                        <button 
                                            className={`favorite-button ${userFavorites.has(event.id || event._id) ? 'favorited' : ''}`}
                                            onClick={() => handleFavorite(event.id || event._id)}
                                        >
                                            {userFavorites.has(event.id || event._id) ? '❤️' : '🤍'}
                                        </button>
                                    )}
                                    <span className="event-category">{event.category}</span>
                                    {user?.isAdmin && (
                                        <div className="admin-controls">
                                            <button 
                                                onClick={() => handleDelete(event._id)} 
                                                className="delete-button"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                            
                            <div className="event-details">
                                <div className="event-info">
                                    <p className="event-date">
                                        <strong>Starts:</strong> {
                                            event.startDate && event.startTime 
                                                ? formatDate(event.startDate, event.startTime)
                                                : 'Date not set'
                                        }
                                    </p>
                                    <p className="event-date">
                                        <strong>Ends:</strong> {
                                            event.endDate && event.endTime 
                                                ? formatDate(event.endDate, event.endTime)
                                                : 'Date not set'
                                        }
                                    </p>
                                    <p className="event-location">
                                        <strong>Location:</strong> {event.location}
                                    </p>
                                    <p className="event-department">
                                        <strong>Department:</strong> {event.department}
                                    </p>
                                    <p className="event-age-group">
                                        <strong>Age Group:</strong> {event.ageGroup}
                                    </p>
                                    {event.cost && (
                                        <p className="event-cost">
                                            <strong>Cost:</strong> {event.cost}
                                        </p>
                                    )}
                                </div>
                                
                                <div className="event-description">
                                    <p>{event.description}</p>
                                </div>

                                <div className="event-actions-footer">
                                    {event.registrationRequired ? (
                                        event.registrationUrl ? (
                                            <a 
                                                href={event.registrationUrl} 
                                                target="_blank" 
                                                rel="noopener noreferrer"
                                                className="register-button external"
                                            >
                                                Register on External Site ↗
                                            </a>
                                        ) : (
                                            <button 
                                                className={`register-button ${userRegistrations.has(event.id || event._id) ? 'registered' : ''}`}
                                                onClick={() => handleRegister(event.id || event._id)}
                                                disabled={userRegistrations.has(event.id || event._id)}
                                            >
                                                {userRegistrations.has(event.id || event._id) ? 'Registered ✓' : 'Register Now'}
                                            </button>
                                        )
                                    ) : (
                                        <span className="no-registration-required">No registration required</span>
                                    )}
                                </div>

                                {event.contactInfo && (
                                    <div className="event-contact">
                                        <h3>Contact Information</h3>
                                        {event.contactInfo.name && <p><strong>Name:</strong> {event.contactInfo.name}</p>}
                                        {event.contactInfo.phone && <p><strong>Phone:</strong> {event.contactInfo.phone}</p>}
                                        {event.contactInfo.email && <p><strong>Email:</strong> {event.contactInfo.email}</p>}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))
                )}
            </div>

            {selectedEvent && (
                <RegistrationModal
                    event={selectedEvent}
                    onClose={() => setSelectedEvent(null)}
                    onSubmit={handleRegistrationSubmit}
                    isLoading={isRegistering}
                />
            )}
        </div>
    );
};

export default EventsList;