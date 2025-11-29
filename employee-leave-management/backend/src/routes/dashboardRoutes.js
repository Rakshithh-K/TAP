const express = require('express');
const { getEmployeeStats, getManagerStats } = require('../controllers/dashboardController');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/employee', auth, getEmployeeStats);
router.get('/manager', auth, getManagerStats);

module.exports = router;