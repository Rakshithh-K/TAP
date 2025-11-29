const mongoose = require('mongoose');
const User = require('../models/User');
require('dotenv').config();

const seedUsers = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    
    // Clear existing users
    await User.deleteMany({});
    
    // Create sample users
    const users = [
      {
        name: 'John Employee',
        email: 'employee@test.com',
        password: 'password123',
        role: 'employee'
      },
      {
        name: 'Jane Manager',
        email: 'manager@test.com',
        password: 'password123',
        role: 'manager'
      }
    ];
    
    await User.insertMany(users);
    console.log('Sample users created successfully!');
    console.log('Employee: employee@test.com / password123');
    console.log('Manager: manager@test.com / password123');
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedUsers();