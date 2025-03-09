const express = require('express');
const router = express.Router();
const Event = require('../models/Event');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

router.post('/:id/register', async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) return res.status(401).json({ message: 'Unauthorized' });

        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'supersecretkey');
        const user = await User.findById(decoded.userId);
        if (!user) return res.status(404).json({ message: 'User not found' });

        await Event.findByIdAndUpdate(req.params.id, { $addToSet: { attendees: user._id } });
        res.json({ message: 'Successfully registered for event' });
    } catch (error) {
        res.status(500).json({ message: 'Error registering for event', error: error.message });
    }
});

module.exports = router;
