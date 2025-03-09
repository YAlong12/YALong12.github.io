const express = require('express');
const router = express.Router();
const Event = require('../models/Event');

// Get all events or filter by category
router.get('/', async (req, res) => {
    try {
        console.log('GET /api/events request received');
        const category = req.query.category;
        const query = category ? { category } : {};
        const events = await Event.find(query);
        console.log('Found events:', events);
        res.json(events);
    } catch (error) {
        console.error('Error fetching events:', error);
        res.status(500).json({ message: 'Error fetching events', error: error.message });
    }
});

// Add a new event
router.post('/', async (req, res) => {
    try {
        console.log('POST /api/events request received:', req.body);
        const newEvent = new Event(req.body);
        const savedEvent = await newEvent.save();
        console.log('Event saved:', savedEvent);
        res.status(201).json(savedEvent);
    } catch (error) {
        console.error('Error adding event:', error);
        res.status(500).json({ message: 'Error adding event', error: error.message });
    }
});

module.exports = router;
