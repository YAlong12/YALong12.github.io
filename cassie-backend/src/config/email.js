const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    }
});

// Test the connection
transporter.verify(function(error, success) {
    if (error) {
        console.log('Email service error:', error);
    } else {
        console.log('Email server is ready to send messages');
    }
});

module.exports = transporter; 