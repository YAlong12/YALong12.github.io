import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import './EventsList.css';

const EventsList = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filter, setFilter] = useState({
        department: '',
        category: '',
        ageGroup: ''
    });

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            const response = await fetch('http://localhost:3002/api/events');
            if (!response.ok) {
                throw new Error('Failed to fetch events');
            }
            const data = await response.json();
            setEvents(data);
        } catch (err) {
            setError('Failed to load events');
            console.error('Error fetching events:', err);
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (date, time) => {
        const dateObj = new Date(`${date}T${time}`);
        return format(dateObj, 'EEEE, MMMM d, yyyy h:mm a');
    };

    const filteredEvents = events.filter(event => {
        return (!filter.department || event.department === filter.department) &&
               (!filter.category || event.category === filter.category) &&
               (!filter.ageGroup || event.ageGroup === filter.ageGroup);
    });

    if (loading) return <div className="events-loading">Loading events...</div>;
    if (error) return <div className="events-error">{error}</div>;

    return (
        <div className="events-page">
            <div className="events-header">
                <h1>Community Events</h1>
                <div className="filters">
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

            <div className="events-list">
                {filteredEvents.length === 0 ? (
                    <div className="no-events">No events found</div>
                ) : (
                    filteredEvents.map(event => (
                        <div key={event._id} className="event-card">
                            <div className="event-header">
                                <h2>{event.title}</h2>
                                <span className="event-category">{event.category}</span>
                            </div>
                            
                            <div className="event-details">
                                <div className="event-info">
                                    <p className="event-date">
                                        <strong>Starts:</strong> {formatDate(event.startDate, event.startTime)}
                                    </p>
                                    <p className="event-date">
                                        <strong>Ends:</strong> {formatDate(event.endDate, event.endTime)}
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

                                {event.registrationRequired && (
                                    <div className="event-registration">
                                        <p><strong>Registration Required</strong></p>
                                        {event.registrationUrl && (
                                            <a 
                                                href={event.registrationUrl} 
                                                target="_blank" 
                                                rel="noopener noreferrer"
                                                className="register-button"
                                            >
                                                Register Now
                                            </a>
                                        )}
                                    </div>
                                )}

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
        </div>
    );
};

export default EventsList;