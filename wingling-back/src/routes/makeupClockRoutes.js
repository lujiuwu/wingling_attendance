const express = require('express');
const router = express.Router();
const { getMakeupClockController, createMakeupClockController, updateMakeupClockController, deleteMakeupClockController, getUserMakeupClockController } = require('../controllers/makeupClockController');

router.post('/create', createMakeupClockController);
router.get('/get', getMakeupClockController);
router.get('/get/:userId', getUserMakeupClockController);
router.put('/update/:makeupClockId', updateMakeupClockController);
router.delete('/delete/:makeupClockId', deleteMakeupClockController);

module.exports = router;