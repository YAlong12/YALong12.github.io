// cassie-backend/routes/events.js
const express = require('express');
const router = express.Router();
const Event = require('../models/event');

// GET /api/events - Retrieve all events
router.get('/', async (req, res) => {
    try {
        const events = await Event.find().sort({ date: 'asc' });
        res.json(events);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// POST /api/events - Create a new event
router.post('/', async (req, res) => {
    const event = new Event({
        title: req.body.title,
        description: req.body.description,
        date: req.body.date,
        location: req.body.location
    });

    try {
        const newEvent = await event.save();
        res.status(201).json(newEvent);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// GET /api/events/:id - Get a specific event
router.get('/:id', async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (event) {
            res.json(event);
        } else {
            res.status(404).json({ message: 'Event not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// PUT /api/events/:id - Update an event
router.put('/:id', async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (event) {
            Object.assign(event, req.body);
            const updatedEvent = await event.save();
            res.json(updatedEvent);
        } else {
            res.status(404).json({ message: 'Event not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// DELETE /api/events/:id - Delete an event
router.delete('/:id', async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (event) {
            await event.deleteOne();
            res.json({ message: 'Event deleted' });
        } else {
            res.status(404).json({ message: 'Event not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
