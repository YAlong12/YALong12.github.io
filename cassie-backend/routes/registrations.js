// cassie-backend/routes/registrations.js
const express = require('express');
const router = express.Router();
const Registration = require('../models/registration');
const Event = require('../models/event');

// GET all registrations
router.get('/', async (req, res) => {
    try {
        const registrations = await Registration.find().populate('eventId');
        res.json(registrations);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// POST new registration
router.post('/', async (req, res) => {
    const registration = new Registration({
        eventId: req.body.eventId,
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone
    });

    try {
        const newRegistration = await registration.save();
        res.status(201).json(newRegistration);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// GET registrations by event ID
router.get('/event/:eventId', async (req, res) => {
    try {
        const registrations = await Registration.find({ eventId: req.params.eventId });
        res.json(registrations);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
