require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');

async function createAdminUser() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        
        // Check if admin already exists
        let adminUser = await User.findOne({ email: 'maddie@example.com' });
        
        if (adminUser) {
            // Update existing user to admin if not already
            if (!adminUser.isAdmin) {
                adminUser.isAdmin = true;
                await adminUser.save();
                console.log('Updated existing user to admin');
            } else {
                console.log('Admin user already exists');
            }
        } else {
            // Create new admin user
            adminUser = new User({
                email: 'maddie@example.com',
                password: 'admin123', // This will be hashed by the pre-save middleware
                isAdmin: true
            });
            
            await adminUser.save();
            console.log('Admin user created successfully');
        }
        
        mongoose.disconnect();
    } catch (error) {
        console.error('Error creating admin user:', error);
        mongoose.disconnect();
    }
}

createAdminUser(); 