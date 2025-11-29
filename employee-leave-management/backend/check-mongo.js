const mongoose = require('mongoose');
require('dotenv').config();

async function checkMongoDB() {
  try {
    console.log('Checking MongoDB connection...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB is running and accessible');
    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.log('❌ MongoDB connection failed:', error.message);
    console.log('\nTo fix this:');
    console.log('1. Install MongoDB: https://www.mongodb.com/try/download/community');
    console.log('2. Start MongoDB service: mongod');
    console.log('3. Or use MongoDB Atlas (cloud): https://cloud.mongodb.com');
    process.exit(1);
  }
}

checkMongoDB();