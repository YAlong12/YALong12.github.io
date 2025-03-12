require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../models/User');

async function createAdminUser() {
    try {
        // Connect to MongoDB using the container name
        await mongoose.connect('mongodb://cassie-mongo:27017/cassie');
        console.log('Connected to MongoDB');
        
        const adminData = {
            email: 'maddie@example.com',
            password: 'admin123',
            isAdmin: true
        };

        // Check if admin already exists
        let adminUser = await User.findOne({ email: adminData.email });
        console.log('Existing user found:', adminUser ? 'Yes' : 'No');
        
        if (adminUser) {
            // Update existing user to admin if not already
            if (!adminUser.isAdmin) {
                adminUser.isAdmin = true;
                await adminUser.save();
                console.log('Updated existing user to admin');
            } else {
                console.log('Admin user already exists');
                // Update password if needed
                const salt = await bcrypt.genSalt(10);
                adminUser.password = await bcrypt.hash(adminData.password, salt);
                await adminUser.save();
                console.log('Updated admin password');
            }
        } else {
            // Create new admin user
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(adminData.password, salt);
            
            adminUser = new User({
                email: adminData.email,
                password: hashedPassword,
                isAdmin: true
            });
            
            await adminUser.save();
            console.log('Admin user created successfully');
        }
        
        console.log('Admin email:', adminData.email);
        console.log('Admin user in DB:', await User.findOne({ email: adminData.email }));
        
        await mongoose.disconnect();
    } catch (error) {
        console.error('Error creating admin user:', error);
        await mongoose.disconnect();
        process.exit(1);
    }
}

createAdminUser(); 