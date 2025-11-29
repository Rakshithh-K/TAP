require('dotenv').config();
const { sendOTPEmail } = require('./src/utils/emailService');

const testEmail = async () => {
  try {
    console.log('Testing email with:', process.env.EMAIL_USER);
    const result = await sendOTPEmail('testmail.services05@gmail.com', '123456', 'Test User');
    console.log('Email sent:', result);
  } catch (error) {
    console.error('Email test failed:', error);
  }
};

testEmail();