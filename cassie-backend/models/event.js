const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    startTime: {
        type: String,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    endTime: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    department: {
        type: String,
        required: true,
        enum: [
            'Parks and Recreation',
            'Police Department',
            'Fire Department',
            'Community Services',
            'Development Services',
            'Public Works',
            'Water Department'
        ]
    },
    category: {
        type: String,
        required: true,
        enum: [
            'Arts & Culture',
            'Classes & Programs',
            'Community',
            'Council & Boards',
            'Parks & Recreation',
            'Public Safety',
            'Senior Activities',
            'Special Events',
            'Youth Programs'
        ]
    },
    ageGroup: {
        type: String,
        required: true,
        enum: [
            'All Ages',
            'Youth (0-12)',
            'Teens (13-17)',
            'Adults (18+)',
            'Seniors (55+)',
            'Family'
        ]
    },
    cost: {
        type: String,
        default: 'Free'
    },
    registrationRequired: {
        type: Boolean,
        default: false
    },
    registrationUrl: String,
    contactInfo: {
        name: String,
        phone: String,
        email: String
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Event', EventSchema);
