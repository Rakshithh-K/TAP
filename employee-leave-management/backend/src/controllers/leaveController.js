const LeaveRequest = require('../models/LeaveRequest');
const User = require('../models/User');

// Employee endpoints
const applyLeave = async (req, res) => {
  try {
    const { leaveType, startDate, endDate, reason } = req.body;
    const start = new Date(startDate);
    const end = new Date(endDate);
    const totalDays = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;
    
    const user = await User.findById(req.user.userId);
    const leaveTypeMap = { sick: 'sickLeave', casual: 'casualLeave', vacation: 'vacation' };
    
    if (user.leaveBalance[leaveTypeMap[leaveType]] < totalDays) {
      return res.status(400).json({ message: 'Insufficient leave balance' });
    }
    
    const leaveRequest = new LeaveRequest({
      userId: req.user.userId,
      leaveType,
      startDate,
      endDate,
      totalDays,
      reason
    });
    
    await leaveRequest.save();
    res.status(201).json(leaveRequest);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getMyRequests = async (req, res) => {
  try {
    const requests = await LeaveRequest.find({ userId: req.user.userId }).sort({ createdAt: -1 });
    res.json(requests);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const cancelRequest = async (req, res) => {
  try {
    const request = await LeaveRequest.findOne({ _id: req.params.id, userId: req.user.userId });
    if (!request) {
      return res.status(404).json({ message: 'Request not found' });
    }
    if (request.status !== 'pending') {
      return res.status(400).json({ message: 'Can only cancel pending requests' });
    }
    await LeaveRequest.findByIdAndDelete(req.params.id);
    res.json({ message: 'Request cancelled successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getLeaveBalance = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('leaveBalance');
    res.json(user.leaveBalance);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Manager endpoints
const getAllRequests = async (req, res) => {
  try {
    const requests = await LeaveRequest.find()
      .populate({
        path: 'userId',
        select: 'name email',
        model: 'User'
      })
      .sort({ createdAt: -1 });
    res.json(requests);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getPendingRequests = async (req, res) => {
  try {
    const requests = await LeaveRequest.find({ status: 'pending' })
      .populate({
        path: 'userId',
        select: 'name email',
        model: 'User'
      })
      .sort({ createdAt: -1 });
    res.json(requests);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const approveLeave = async (req, res) => {
  try {
    const { managerComment } = req.body;
    const request = await LeaveRequest.findById(req.params.id);
    if (!request) {
      return res.status(404).json({ message: 'Request not found' });
    }
    
    // Deduct leave balance
    const user = await User.findById(request.userId);
    const leaveTypeMap = { sick: 'sickLeave', casual: 'casualLeave', vacation: 'vacation' };
    user.leaveBalance[leaveTypeMap[request.leaveType]] -= request.totalDays;
    await user.save();
    
    request.status = 'approved';
    request.managerComment = managerComment || '';
    await request.save();
    
    res.json(request);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const rejectLeave = async (req, res) => {
  try {
    const { managerComment } = req.body;
    const request = await LeaveRequest.findByIdAndUpdate(
      req.params.id,
      { status: 'rejected', managerComment: managerComment || '' },
      { new: true }
    );
    res.json(request);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  applyLeave,
  getMyRequests,
  cancelRequest,
  getLeaveBalance,
  getAllRequests,
  getPendingRequests,
  approveLeave,
  rejectLeave
};