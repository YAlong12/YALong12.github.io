const express = require('express');
const router = express.Router();
const Event = require('../models/Event');

// Get all events or filter by category
router.get('/', async (req, res) => {
    try {
        const category = req.query.category;
        const query = category ? { category } : {};
        const events = await Event.find(query);
        res.status(200).json(events);
    } catch (error) {
        console.error("Error fetching events:", error);
        res.status(500).json({ message: 'Error fetching events', error: error.message });
    }
});

// Add a new event with validation
router.post('/', async (req, res) => {
    try {
        const { title, description, date, location, category } = req.body;

        if (!title || !description || !date || !location || !category) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const newEvent = new Event({
            title,
            description,
            date,
            location,
            category
        });

        const savedEvent = await newEvent.save();
        res.status(201).json(savedEvent);
    } catch (error) {
        console.error("Error adding event:", error);
        res.status(500).json({ message: 'Error adding event', error: error.message });
    }
});

module.exports = router;
