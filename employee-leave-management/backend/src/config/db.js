const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('Database connection failed:', error.message);
    console.log('Please ensure MongoDB is running on your system');
    console.log('You can start MongoDB with: mongod');
    process.exit(1);
  }
};

module.exports = connectDB;