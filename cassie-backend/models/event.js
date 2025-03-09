const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, required: true },
    location: { type: String, required: true },
    category: { type: String, enum: ['activities', 'local-events', 'sports'], required: true }
});

module.exports = mongoose.model('Event', EventSchema);
