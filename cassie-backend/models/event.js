// backend/models/Event.js
const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
    title: String,
    description: String,
    date: String,
    location: String,
    category: String
});

module.exports = mongoose.model('Event', EventSchema);
