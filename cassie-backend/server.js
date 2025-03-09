const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const eventsRoutes = require('./routes/events');
const authRoutes = require('./routes/auth');

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/events', eventsRoutes);
app.use('/api/auth', authRoutes);

app.listen(3000, () => console.log('Server started on port 3000'));

