const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { sendOTPEmail } = require('../utils/emailService');

const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }
    
    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
    
    // Create user with OTP
    const user = new User({ 
      name, 
      email, 
      password, 
      role,
      verificationOTP: otp,
      otpExpires,
      isVerified: false
    });
    await user.save();
    
    // Send OTP email (don't fail if email fails)
    try {
      await sendOTPEmail(email, otp, name);
      console.log(`OTP sent to ${email}: ${otp}`);
    } catch (emailError) {
      console.error('Email failed but continuing:', emailError);
    }
    
    res.status(201).json({ 
      message: 'Registration successful! Please check your email for OTP verification.',
      userId: user._id,
      email: user.email,
      otp: otp // Remove this in production
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !await bcrypt.compare(password, user.password)) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    if (!user.isVerified) {
      return res.status(401).json({ 
        message: 'Please verify your email first',
        requiresVerification: true,
        userId: user._id
      });
    }
    
    const token = generateToken(user._id);
    res.json({ 
      token, 
      user: { 
        id: user._id, 
        name: user.name, 
        email, 
        role: user.role,
        leaveBalance: user.leaveBalance 
      } 
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-password');
    res.json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const verifyOTP = async (req, res) => {
  try {
    const { userId, otp } = req.body;
    const user = await User.findById(userId);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    if (user.isVerified) {
      return res.status(400).json({ message: 'Email already verified' });
    }
    
    if (user.verificationOTP !== otp) {
      return res.status(400).json({ message: 'Invalid OTP' });
    }
    
    if (new Date() > user.otpExpires) {
      return res.status(400).json({ message: 'OTP has expired' });
    }
    
    // Verify user
    user.isVerified = true;
    user.verificationOTP = undefined;
    user.otpExpires = undefined;
    await user.save();
    
    const token = generateToken(user._id);
    res.json({ 
      message: 'Email verified successfully!',
      token, 
      user: { 
        id: user._id, 
        name: user.name, 
        email: user.email, 
        role: user.role,
        leaveBalance: user.leaveBalance 
      } 
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const resendOTP = async (req, res) => {
  try {
    const { userId } = req.body;
    const user = await User.findById(userId);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    if (user.isVerified) {
      return res.status(400).json({ message: 'Email already verified' });
    }
    
    // Generate new OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000);
    
    user.verificationOTP = otp;
    user.otpExpires = otpExpires;
    await user.save();
    
    // Send OTP email
    const emailSent = await sendOTPEmail(user.email, otp, user.name);
    if (!emailSent) {
      return res.status(500).json({ message: 'Failed to send verification email' });
    }
    
    res.json({ message: 'OTP sent successfully!' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { register, login, getMe, verifyOTP, resendOTP };