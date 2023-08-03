const express = require('express');
const router = express.Router();
const { clockInController, clockOutController } = require('../controllers/clockController');

router.post('/clockIn', clockInController);
router.post('/clockOut', clockOutController);

module.exports = router;