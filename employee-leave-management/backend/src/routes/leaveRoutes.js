const express = require('express');
const {
  applyLeave,
  getMyRequests,
  cancelRequest,
  getLeaveBalance,
  getAllRequests,
  getPendingRequests,
  approveLeave,
  rejectLeave
} = require('../controllers/leaveController');
const auth = require('../middleware/auth');
const roleAuth = require('../middleware/roleAuth');

const router = express.Router();

// Employee routes
router.post('/', auth, roleAuth(['employee']), applyLeave);
router.get('/my-requests', auth, roleAuth(['employee']), getMyRequests);
router.delete('/:id', auth, roleAuth(['employee']), cancelRequest);
router.get('/balance', auth, roleAuth(['employee']), getLeaveBalance);

// Manager routes
router.get('/all', auth, roleAuth(['manager']), getAllRequests);
router.get('/pending', auth, roleAuth(['manager']), getPendingRequests);
router.put('/:id/approve', auth, roleAuth(['manager']), approveLeave);
router.put('/:id/reject', auth, roleAuth(['manager']), rejectLeave);

module.exports = router;