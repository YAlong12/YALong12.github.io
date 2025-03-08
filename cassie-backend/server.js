// cassie-backend/server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON bodies and handle CORS
app.use(express.json());
app.use(cors());

// MongoDB connection with better error handling
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB Atlas'))
.catch(err => {
    console.error('MongoDB connection error:', err);
    console.error('Please check your MongoDB connection string and credentials');
});

app.get('/', (req, res) => {
  res.send('Cassie API Running');
});

// Routes
const eventsRoute = require('./routes/events');
const registrationsRoute = require('./routes/registrations');

app.use('/api/events', eventsRoute);
app.use('/api/registrations', registrationsRoute);

const server = app.listen(port, () => console.log(`Server started on port ${port}`));

server.on('error', (e) => {
  if (e.code === 'EADDRINUSE') {
    console.log(`Port ${port} is busy, trying ${port + 1}...`);
    setTimeout(() => {
      server.close();
      app.listen(port + 1, () => console.log(`Server started on port ${port + 1}`));
    }, 1000);
  }
});
