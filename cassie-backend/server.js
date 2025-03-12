require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const usersRoutes = require(path.join(__dirname, 'routes', 'users.js'));
const eventsRoutes = require('./routes/events');
const usersRouter = require('./routes/users');
const fs = require('fs');
const User = require('./models/User');

const app = express();

// CORS configuration - must be before any routes
app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:3002'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Debug middleware
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    console.log('Headers:', req.headers);
    next();
});

// Add this before your routes
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    console.log('Body:', req.body);
    console.log('Headers:', req.headers);
    next();
});

// Add this line to serve static files from the uploads directory
app.use('/uploads', express.static('uploads'));

// Make sure the uploads directory exists
if (!fs.existsSync('uploads')) {
    fs.mkdirSync('uploads');
}

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('✅ Connected to MongoDB successfully'))
    .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/users', usersRouter);
app.use('/api/events', eventsRoutes);

// Test route
app.get('/test', (req, res) => {
    res.json({ message: 'Backend is working' });
});

// Debug route to check users
app.get('/api/debug/users', async (req, res) => {
    try {
        const users = await User.find({}, { email: 1, isAdmin: 1 });
        res.json({ count: users.length, users });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Error handling middleware - must be last
app.use((err, req, res, next) => {
    console.error('\n=== Error Handler ===');
    console.error('Error:', err);
    console.error('Stack:', err.stack);
    
    // Ensure we're sending JSON
    res.setHeader('Content-Type', 'application/json');
    
    return res.status(500).json({ 
        message: 'Server error', 
        error: err.message,
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
});

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
    console.log(`🚀 Server started on port ${PORT}`);
    console.log(`Routes configured at: /api/users, /api/events`);
});

module.exports = app;


