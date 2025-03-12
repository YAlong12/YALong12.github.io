const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Event = require('../models/event');
const auth = require('../middleware/auth');

const router = express.Router();

// Debug middleware for this route
router.use((req, res, next) => {
    console.log('Users route:', req.method, req.path);
    console.log('User:', req.user);
    next();
});

// Register route
router.post('/register', async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log('Register attempt for:', email); // Add logging

        if (!email || !password) {
            return res.status(400).json({ message: 'Please provide both email and password' });
        }

        // Check if user already exists
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Create new user
        user = new User({
            email,
            password // Password will be hashed by the pre-save middleware
        });

        await user.save();
        console.log('User created:', email); // Add logging

        // Create token
        const token = jwt.sign(
            { userId: user._id, isAdmin: user.isAdmin },
            process.env.JWT_SECRET,
            { expiresIn: '5h' }
        );

        res.status(201).json({ 
            token, 
            userId: user._id,
            isAdmin: user.isAdmin 
        });

    } catch (err) {
        console.error('Registration error:', err);
        res.status(500).json({ message: 'Error creating user', error: err.message });
    }
});

// Login route
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log('Login attempt for:', email);

        // Find user
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Check password
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Create token with user ID and admin status
        const token = jwt.sign(
            { 
                userId: user._id,
                isAdmin: user.isAdmin 
            },
            process.env.JWT_SECRET,
            { expiresIn: '5h' }
        );

        console.log('Login successful for:', email, 'isAdmin:', user.isAdmin);

        // Send response
        res.json({
            token,
            userId: user._id,
            isAdmin: user.isAdmin
        });

    } catch (err) {
        console.error('Login error:', err);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

// Get user's saved events
router.get('/saved-events', auth, async (req, res) => {
    try {
        const events = await Event.find({
            favorites: req.user.userId
        }).sort({ startDate: 1 });
        res.json(events);
    } catch (err) {
        console.error('Error fetching saved events:', err);
        res.status(500).json({ message: 'Error fetching saved events' });
    }
});

// Get user's registered events
router.get('/registered-events', auth, async (req, res) => {
    try {
        const events = await Event.find({
            registeredUsers: req.user.userId
        }).sort({ startDate: 1 });
        res.json(events);
    } catch (err) {
        console.error('Error fetching registered events:', err);
        res.status(500).json({ message: 'Error fetching registered events' });
    }
});

// Admin registration route
router.post('/register-admin', async (req, res) => {
    try {
        const { email, password, adminKey } = req.body;
        console.log('Admin registration attempt for:', email);

        // Verify admin key
        if (adminKey !== process.env.ADMIN_KEY && adminKey !== 'cassie-admin-key-2024') {
            return res.status(401).json({ message: 'Invalid admin key' });
        }

        if (!email || !password) {
            return res.status(400).json({ message: 'Please provide both email and password' });
        }

        // Check if user already exists
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Create new admin user
        user = new User({
            email,
            password,
            isAdmin: true // Set admin status
        });

        await user.save();
        console.log('Admin user created:', email);

        // Create token
        const token = jwt.sign(
            { userId: user._id, isAdmin: true },
            process.env.JWT_SECRET || 'a1b2c3d4e5f6g7h',
            { expiresIn: '5h' }
        );

        res.status(201).json({ 
            token, 
            userId: user._id,
            isAdmin: true
        });

    } catch (err) {
        console.error('Admin registration error:', err);
        res.status(500).json({ message: 'Error creating admin user', error: err.message });
    }
});

module.exports = router;
