const express = require('express');
const router = express.Router();
const { getWeeklyAttendanceController } = require('../controllers/attendanceController');

router.get('/weeklyAttendance/:userId', getWeeklyAttendanceController);

module.exports = router;
