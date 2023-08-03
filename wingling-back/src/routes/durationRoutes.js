const express = require('express');
const router = express.Router();
const { getCurrentProgressController, getUserProgressController } = require('../controllers/durationController');

router.get('/progress', getCurrentProgressController);
router.get('/progress/:userId', getUserProgressController);

module.exports = router;