const LeaveRequest = require('../models/LeaveRequest');
const User = require('../models/User');

const getEmployeeStats = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    const totalRequests = await LeaveRequest.countDocuments({ userId: req.user.userId });
    const pendingRequests = await LeaveRequest.countDocuments({ userId: req.user.userId, status: 'pending' });
    const approvedRequests = await LeaveRequest.countDocuments({ userId: req.user.userId, status: 'approved' });
    const rejectedRequests = await LeaveRequest.countDocuments({ userId: req.user.userId, status: 'rejected' });
    
    res.json({
      leaveBalance: user.leaveBalance,
      totalRequests,
      pendingRequests,
      approvedRequests,
      rejectedRequests
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getManagerStats = async (req, res) => {
  try {
    const totalEmployees = await User.countDocuments({ role: 'employee' });
    const totalRequests = await LeaveRequest.countDocuments();
    const pendingRequests = await LeaveRequest.countDocuments({ status: 'pending' });
    const approvedRequests = await LeaveRequest.countDocuments({ status: 'approved' });
    const rejectedRequests = await LeaveRequest.countDocuments({ status: 'rejected' });
    
    const recentRequests = await LeaveRequest.find()
      .populate('userId', 'name email')
      .sort({ createdAt: -1 })
      .limit(5);
    
    res.json({
      totalEmployees,
      totalRequests,
      pendingRequests,
      approvedRequests,
      rejectedRequests,
      recentRequests
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { getEmployeeStats, getManagerStats };