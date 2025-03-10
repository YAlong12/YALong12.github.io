const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

// Debug middleware for this route
router.use((req, res, next) => {
    console.log('User route:', req.method, req.path);
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
        console.log('Login attempt:', { email });

        if (!email || !password) {
            console.log('Missing email or password');
            return res.status(400).json({ message: 'Email and password are required' });
        }

        // Find user
        const user = await User.findOne({ email });
        console.log('User found:', user ? 'Yes' : 'No');
        console.log('User details:', user);

        if (!user) {
            console.log('No user found with email:', email);
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        console.log('Password match:', isMatch ? 'Yes' : 'No');

        if (!isMatch) {
            console.log('Password does not match for user:', email);
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Create token
        const token = jwt.sign(
            { userId: user._id, isAdmin: user.isAdmin },
            process.env.JWT_SECRET,
            { expiresIn: '5h' }
        );

        console.log('Login successful for:', email);
        
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

module.exports = router;
