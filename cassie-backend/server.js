const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors({
    origin: 'http://localhost:3001',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Connection URL
const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/cassie';

// Connect to MongoDB with more detailed error handling
mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log("✅ Connected to MongoDB successfully");
})
.catch(err => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1); // Exit if cannot connect to database
});

// Add error handler for MongoDB connection
mongoose.connection.on('error', err => {
    console.error('MongoDB connection error:', err);
});

mongoose.connection.on('disconnected', () => {
    console.log('MongoDB disconnected');
});

// Basic error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something broke!', error: err.message });
});

// Routes
app.use('/api/events', require('./routes/events'));
app.use('/api/users', require('./routes/users'));

// Add a test route
app.get('/api/test', (req, res) => {
    res.json({ message: 'API is working' });
});

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
    console.log(`🚀 Server started on port ${PORT}`);
});


