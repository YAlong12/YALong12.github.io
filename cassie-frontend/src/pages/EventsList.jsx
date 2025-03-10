import React, { useState, useEffect } from 'react';
import { format, parseISO } from 'date-fns';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import './EventsList.css';
import { fetchWithAuth } from '../utils/api';
import RegistrationModal from '../components/RegistrationModal';
import defaultEventImage from '../assets/default-event.jpg';

const EventsList = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
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
    const [selectedEventDetails, setSelectedEventDetails] = useState(null);
    const [showRegistrationModal, setShowRegistrationModal] = useState(false);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const data = await fetchWithAuth('/events');
                console.log('Fetched events:', data);
                setEvents(data);
            } catch (err) {
                setError('Failed to load events');
                console.error('Error fetching events:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, []);

    useEffect(() => {
        const loadUserData = async () => {
            if (!user) return;

            try {
                // Fetch both saved and registered events in parallel
                const [savedResponse, registeredResponse] = await Promise.all([
                    fetchWithAuth('/users/saved-events'),
                    fetchWithAuth('/users/registered-events')
                ]);

                console.log('Registered events response:', registeredResponse); // Debug log

                // Update the registrations set with event IDs
                const registeredEventIds = registeredResponse.map(event => event._id || event.id);
                console.log('Registered event IDs:', registeredEventIds); // Debug log
                
                setUserRegistrations(new Set(registeredEventIds));
                setUserFavorites(new Set(savedResponse.map(event => event._id || event.id)));
            } catch (err) {
                console.error('Error loading user data:', err);
                setActionFeedback({
                    message: 'Failed to load user data',
                    type: 'error'
                });
            }
        };

        loadUserData();
    }, [user]); // Only depend on user changes

    useEffect(() => {
        console.log('Current userRegistrations:', userRegistrations);
        console.log('Current events:', events);
    }, [userRegistrations, events]);

    useEffect(() => {
        // Get category from URL parameters
        const categoryFromUrl = searchParams.get('category');
        console.log('Category from URL:', categoryFromUrl);
        if (categoryFromUrl) {
            setFilter(prev => ({
                ...prev,
                category: categoryFromUrl
            }));
            console.log('Setting filter to:', categoryFromUrl);
        }
    }, [searchParams]);

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
            // Get the event ID, checking both id and _id properties
            const id = eventId || event.id;
            console.log('Event ID:', id);

            // Make sure we have a valid eventId
            if (!id) {
                console.error('No event ID provided');
                setActionFeedback({ 
                    message: 'Could not favorite event: Invalid event ID', 
                    type: 'error' 
                });
                return;
            }

            const response = await fetchWithAuth(`/events/${id}/favorite`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            console.log('Favorite response:', response);

            if (response.isFavorited !== undefined) {
                if (response.isFavorited) {
                    setUserFavorites(prev => new Set([...prev, id]));
                    setActionFeedback({ 
                        message: 'Event added to favorites!', 
                        type: 'success' 
                    });
                } else {
                    setUserFavorites(prev => {
                        const newFavorites = new Set(prev);
                        newFavorites.delete(id);
                        return newFavorites;
                    });
                    setActionFeedback({ 
                        message: 'Event removed from favorites', 
                        type: 'info' 
                    });
                }
            }
        } catch (err) {
            console.error('Error favoriting event:', err);
            setActionFeedback({ 
                message: 'Failed to update favorites', 
                type: 'error' 
            });
        }
    };

    const handleRegister = (eventId) => {
        if (!user) {
            navigate('/login');
            return;
        }
        setSelectedEvent(selectedEventDetails);
        setShowRegistrationModal(true);
    };

    const handleRegistrationSubmit = async (formData) => {
        setIsRegistering(true);
        try {
            await fetchWithAuth(`/events/${selectedEvent.id || selectedEvent._id}/register`, {
                method: 'POST',
                body: JSON.stringify(formData)
            });
            
            // Update local state
            setUserRegistrations(prev => new Set([...prev, selectedEvent.id || selectedEvent._id]));
            
            // Close modals
            setSelectedEvent(null);
            setSelectedEventDetails(null);
            setShowRegistrationModal(false);
            setIsRegistering(false);
            
            // Show success message
            setActionFeedback({
                message: 'Successfully registered for event!',
                type: 'success'
            });

            // Refresh user data to ensure consistency
            const registeredResponse = await fetchWithAuth('/users/registered-events');
            setUserRegistrations(new Set(registeredResponse.map(event => event._id || event.id)));
            
            setTimeout(() => {
                setActionFeedback({ message: '', type: '' });
            }, 3000);
        } catch (err) {
            console.error('Error registering:', err);
            setActionFeedback({
                message: 'Failed to register for event',
                type: 'error'
            });
            setIsRegistering(false);
        }
    };

    const handleUnregister = async (eventId) => {
        try {
            await fetchWithAuth(`/events/${eventId}/unregister`, {
                method: 'DELETE'
            });

            // Update local state to reflect the unregistration
            setUserRegistrations(prev => {
                const newRegistrations = new Set(prev);
                newRegistrations.delete(eventId);
                return newRegistrations;
            });

            setActionFeedback({
                message: 'Successfully unregistered from event',
                type: 'success'
            });

            // Refresh user data to ensure consistency
            const registeredResponse = await fetchWithAuth('/users/registered-events');
            setUserRegistrations(new Set(registeredResponse.map(event => event._id || event.id)));

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
        console.log('Event category:', event.category);
        console.log('Filter category:', filter.category);
        
        // Filter by search term
        const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            event.location.toLowerCase().includes(searchTerm.toLowerCase());

        // Filter by category
        const matchesCategory = !filter.category || event.category === filter.category;

        // Filter by department
        const matchesDepartment = !filter.department || event.department === filter.department;

        // Filter by age group
        const matchesAgeGroup = !filter.ageGroup || event.ageGroup === filter.ageGroup;

        // Filter by date (if implemented)
        const matchesDate = !filter.date || event.startDate === filter.date;

        return matchesSearch && matchesCategory && matchesDepartment && matchesAgeGroup && matchesDate;
    });

    const handleViewDetails = (event) => {
        setSelectedEventDetails(event);
    };

    const handleCloseDetails = () => {
        setSelectedEventDetails(null);
    };

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
                    {user?.isAdmin && (
                        <Link to="/events/create" className="create-event-button">
                            Create New Event
                        </Link>
                    )}
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
                                <option value="Parks & Recreation">Parks & Recreation</option>
                                <option value="Library">Library</option>
                                <option value="Police">Police</option>
                                <option value="Fire">Fire</option>
                                <option value="Community Services">Community Services</option>
                            </select>
                        </div>

                        <div className="filter-group">
                            <label className="filter-label">Category</label>
                            <select 
                                value={filter.category} 
                                onChange={(e) => setFilter({...filter, category: e.target.value})}
                            >
                                <option value="">All Categories</option>
                                <option value="Community Gatherings">Community Gatherings</option>
                                <option value="Workshops & Classes">Workshops & Classes</option>
                                <option value="Entertainment & Arts">Entertainment & Arts</option>
                                <option value="Sports & Recreation">Sports & Recreation</option>
                                <option value="Networking & Business">Networking & Business</option>
                                <option value="Volunteer & Charity">Volunteer & Charity</option>
                                <option value="Family & Kids">Family & Kids</option>
                                <option value="Food & Drink">Food & Drink</option>
                                <option value="Health & Wellness">Health & Wellness</option>
                                <option value="Education & Talks">Education & Talks</option>
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

            <div className="events-grid">
                {filteredEvents.map(event => (
                    <div key={event.id || event._id} className="event-card">
                        <img 
                            src={event.imageUrl || defaultEventImage} 
                            alt={event.title}
                            className="event-image"
                            onError={(e) => {
                                e.target.src = defaultEventImage;
                                e.target.onerror = null;
                            }}
                            onClick={() => handleViewDetails(event)}
                            style={{ cursor: 'pointer' }}
                        />
                        <div className="event-content">
                            <div className="event-info">
                                <div className="event-date">
                                    {formatDate(event.startDate, event.startTime)}
                                </div>
                                <h3 className="event-title" onClick={() => handleViewDetails(event)} style={{ cursor: 'pointer' }}>
                                    {event.title}
                                </h3>
                                <div className="event-location">
                                    📍 {event.location}
                                </div>
                                <div className="event-price">
                                    {event.cost || 'Free'}
                                </div>
                            </div>
                            
                            <div className="event-actions">
                                <button 
                                    className="view-details-button"
                                    onClick={() => handleViewDetails(event)}
                                >
                                    View Details
                                </button>
                                {user && !user.isAdmin && userRegistrations.has(event.id || event._id) && (
                                    <button 
                                        className="unregister-button"
                                        onClick={() => handleUnregister(event.id || event._id)}
                                    >
                                        Unregister
                                    </button>
                                )}
                            </div>
                        </div>
                        {user && !user.isAdmin && (
                            <button 
                                className={`favorite-button ${userFavorites.has(event.id || event._id) ? 'favorited' : ''}`}
                                onClick={() => handleFavorite(event.id || event._id)}
                            >
                                {userFavorites.has(event.id || event._id) ? '❤️' : '🤍'}
                            </button>
                        )}
                    </div>
                ))}
            </div>

            {selectedEventDetails && (
                <div className="event-details-overlay">
                    <div className="event-details-modal">
                        <button className="close-button" onClick={handleCloseDetails}>×</button>
                        <img 
                            src={selectedEventDetails.imageUrl || defaultEventImage}
                            alt={selectedEventDetails.title}
                            className="event-details-image"
                            onError={(e) => {
                                e.target.src = defaultEventImage;
                                e.target.onerror = null;
                            }}
                        />
                        
                        <div className="event-details-content">
                            <h1>{selectedEventDetails.title}</h1>
                            
                            <div className="event-details-info">
                                <div className="info-item">
                                    <span className="label">Date & Time:</span>
                                    <span>{formatDate(selectedEventDetails.startDate, selectedEventDetails.startTime)}</span>
                                </div>
                                <div className="info-item">
                                    <span className="label">Location:</span>
                                    <span>{selectedEventDetails.location}</span>
                                </div>
                                <div className="info-item">
                                    <span className="label">Department:</span>
                                    <span>{selectedEventDetails.department}</span>
                                </div>
                                <div className="info-item">
                                    <span className="label">Category:</span>
                                    <span>{selectedEventDetails.category}</span>
                                </div>
                                <div className="info-item">
                                    <span className="label">Cost:</span>
                                    <span>{selectedEventDetails.cost || 'Free'}</span>
                                </div>
                            </div>

                            <div className="event-description">
                                <h2>Description</h2>
                                <p>{selectedEventDetails.description}</p>
                            </div>

                            {user && !user.isAdmin && (
                                <div className="event-registration-actions">
                                    {userRegistrations.has(selectedEventDetails.id || selectedEventDetails._id) ? (
                                        <button 
                                            className="unregister-button"
                                            onClick={() => handleUnregister(selectedEventDetails.id || selectedEventDetails._id)}
                                        >
                                            Unregister
                                        </button>
                                    ) : (
                                        <button 
                                            className="register-button"
                                            onClick={() => handleRegister(selectedEventDetails.id || selectedEventDetails._id)}
                                        >
                                            Register Now
                                        </button>
                                    )}
                                </div>
                            )}
                        </div>

                        {showRegistrationModal && (
                            <div className="registration-modal-overlay">
                                <div className="registration-modal">
                                    <RegistrationModal
                                        event={selectedEvent}
                                        onClose={() => setShowRegistrationModal(false)}
                                        onSubmit={handleRegistrationSubmit}
                                        isLoading={isRegistering}
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default EventsList;