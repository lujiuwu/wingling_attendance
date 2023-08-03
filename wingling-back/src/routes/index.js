const express = require('express');
const router = express.Router();

const authRoutes = require('./authRoutes');
const clockRoutes = require('./clockRoutes');
const durationRoutes = require('./durationRoutes');
const makeupClockRoutes = require('./makeupClockRoutes');
const userManagementRoutes = require('./userManagementRoutes');
const attendanceRoutes = require('./attendanceRoutes');
const checkTokenMiddleware = require('../middlewares/checkTokenMiddleware');

router.use('/auth', authRoutes);
router.use('/clock', checkTokenMiddleware, clockRoutes);
router.use('/duration', checkTokenMiddleware, durationRoutes);
router.use('/makeupClock', checkTokenMiddleware, makeupClockRoutes);
router.use('/user', userManagementRoutes);
router.use('/attendance', checkTokenMiddleware, attendanceRoutes);

module.exports = router;