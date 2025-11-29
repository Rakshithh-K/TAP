const roleAuth = (roles) => {
  return async (req, res, next) => {
    try {
      const User = require('../models/User');
      const user = await User.findById(req.user.userId);
      
      if (!user) {
        return res.status(401).json({ message: 'User not found' });
      }
      
      if (!roles.includes(user.role)) {
        return res.status(403).json({ message: 'Access denied. Insufficient permissions.' });
      }
      
      req.user.role = user.role;
      next();
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  };
};

module.exports = roleAuth;