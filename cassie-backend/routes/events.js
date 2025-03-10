const express = require('express');
const router = express.Router();
const Event = require('../models/event');
const auth = require('../middleware/auth');
const Registration = require('../models/registration');

// Debug middleware
router.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`);
    next();
});

// Get all events
router.get('/', async (req, res) => {
    try {
        const events = await Event.find()
            .sort({ startDate: 1, startTime: 1 });
        res.json(events);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get upcoming events
router.get('/upcoming', async (req, res) => {
    try {
        const events = await Event.find({
            startDate: { $gte: new Date() }
        })
        .sort({ startDate: 1 })
        .limit(10);
        res.json(events);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get events by category
router.get('/category/:category', async (req, res) => {
    try {
        const events = await Event.find({ 
            category: req.params.category,
            startDate: { $gte: new Date() }
        }).sort({ startDate: 1 });
        res.json(events);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get events by department
router.get('/department/:department', async (req, res) => {
    try {
        const events = await Event.find({ 
            department: req.params.department,
            startDate: { $gte: new Date() }
        }).sort({ startDate: 1 });
        res.json(events);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create new event (admin only)
router.post('/', auth, async (req, res) => {
    try {
        console.log('\n=== Create Event Request ===');
        console.log('User:', req.user);
        console.log('Headers:', req.headers);
        console.log('Body:', req.body);
        
        // Check if user is admin
        if (!req.user || !req.user.isAdmin) {
            console.log('Authorization failed: User is not admin');
            return res.status(403).json({ message: 'Only admins can create events' });
        }

        // Validate required fields
        const requiredFields = ['title', 'description', 'startDate', 'startTime', 'endDate', 'endTime', 'location', 'department', 'category', 'ageGroup'];
        const missingFields = requiredFields.filter(field => !req.body[field]);

        if (missingFields.length > 0) {
            console.log('Validation failed: Missing fields:', missingFields);
            return res.status(400).json({ 
                message: 'Missing required fields', 
                fields: missingFields 
            });
        }

        // Create event object
        const eventData = {
            ...req.body,
            createdBy: req.user.userId
        };

        console.log('Creating event with data:', JSON.stringify(eventData, null, 2));

        const event = new Event(eventData);
        const newEvent = await event.save();
        
        console.log('Event created successfully:', newEvent);
        
        return res.status(201).json(newEvent);
    } catch (err) {
        console.error('Error creating event:', err);
        return res.status(400).json({ 
            message: 'Error creating event', 
            error: err.message,
            stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
        });
    }
});

// Get single event by ID
router.get('/:id', async (req, res) => {
    try {
        console.log('Fetching event with ID:', req.params.id);
        
        if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ message: 'Invalid event ID format' });
        }

        const event = await Event.findById(req.params.id);
        
        if (!event) {
            console.log('Event not found');
            return res.status(404).json({ message: 'Event not found' });
        }
        
        console.log('Found event:', event);
        res.json(event);
    } catch (err) {
        console.error('Error fetching event:', err);
        res.status(500).json({ message: err.message });
    }
});

// Update event (admin only)
router.put('/:id', auth, async (req, res) => {
    try {
        console.log('Update request for event:', req.params.id);
        
        if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ message: 'Invalid event ID format' });
        }

        if (!req.user.isAdmin) {
            return res.status(403).json({ message: 'Only admins can update events' });
        }

        const event = await Event.findById(req.params.id);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        // Update the event with the new data
        Object.assign(event, req.body);
        event.updatedAt = new Date();

        const updatedEvent = await event.save();
        console.log('Event updated successfully:', updatedEvent);
        res.json(updatedEvent);
    } catch (err) {
        console.error('Error updating event:', err);
        res.status(400).json({ message: err.message });
    }
});

// Delete event (admin only)
router.delete('/:id', auth, async (req, res) => {
    try {
        if (!req.user.isAdmin) {
            return res.status(403).json({ message: 'Only admins can delete events' });
        }

        const event = await Event.findById(req.params.id);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        await event.remove();
        res.json({ message: 'Event deleted successfully' });
    } catch (err) {
        console.error('Error deleting event:', err);
        res.status(500).json({ message: 'Error deleting event', error: err.message });
    }
});

// Toggle favorite status
router.post('/:id/favorite', auth, async (req, res) => {
    try {
        console.log('Favorite request for event:', req.params.id);
        console.log('User:', req.user);

        if (!req.params.id) {
            return res.status(400).json({ message: 'Event ID is required' });
        }

        const event = await Event.findById(req.params.id);
        if (!event) {
            console.log('Event not found:', req.params.id);
            return res.status(404).json({ message: 'Event not found' });
        }

        // Initialize favorites array if it doesn't exist
        if (!event.favorites) {
            event.favorites = [];
        }

        const userIndex = event.favorites.findIndex(id => 
            id.toString() === req.user.userId.toString()
        );
        
        console.log('Current favorites:', event.favorites);
        console.log('User index in favorites:', userIndex);
        console.log('User ID:', req.user.userId);

        if (userIndex === -1) {
            event.favorites.push(req.user.userId);
            console.log('Adding user to favorites');
        } else {
            event.favorites.splice(userIndex, 1);
            console.log('Removing user from favorites');
        }

        await event.save();
        console.log('Updated favorites:', event.favorites);

        res.json({ 
            isFavorited: userIndex === -1,
            favoritesCount: event.favorites.length 
        });
    } catch (err) {
        console.error('Error in favorite route:', err);
        res.status(500).json({ message: err.message });
    }
});

// Register for event
router.post('/:id/register', auth, async (req, res) => {
    try {
        const { name, email, phone, specialRequirements } = req.body;
        
        if (!name || !email || !phone) {
            return res.status(400).json({ message: 'Name, email, and phone are required' });
        }

        const event = await Event.findById(req.params.id);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        // Create registration record
        const registration = new Registration({
            eventId: event._id,
            userId: req.user.userId,
            name,
            email,
            phone,
            specialRequirements
        });

        await registration.save();

        // Add user to registered users
        if (!event.registeredUsers.includes(req.user.userId)) {
            event.registeredUsers.push(req.user.userId);
            await event.save();
        }

        res.json({ 
            isRegistered: true,
            registrationId: registration._id
        });
    } catch (err) {
        console.error('Error in register route:', err);
        res.status(500).json({ message: err.message });
    }
});

// Unregister from event
router.delete('/:id/register', auth, async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        // Remove user from registeredUsers
        const userIndex = event.registeredUsers.indexOf(req.user.userId);
        if (userIndex === -1) {
            return res.status(400).json({ message: 'Not registered for this event' });
        }

        event.registeredUsers.splice(userIndex, 1);
        await event.save();

        // Delete the registration record
        await Registration.deleteOne({ 
            eventId: event._id, 
            userId: req.user.userId 
        });

        res.json({ 
            message: 'Successfully unregistered from event',
            isRegistered: false
        });
    } catch (err) {
        console.error('Error in unregister route:', err);
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
