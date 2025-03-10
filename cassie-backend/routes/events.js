const express = require('express');
const router = express.Router();
const Event = require('../models/event');
const auth = require('../middleware/auth');

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

module.exports = router;
