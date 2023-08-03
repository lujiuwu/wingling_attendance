const express = require('express');
const router = express.Router();
const uploadAvatarMiddleware = require('../middlewares/uploadAvatarMiddleware');
const { createUserController, editUserController, deleteUserController } = require('../controllers/userManagementController');

router.post('/create', createUserController);
router.post('/edit/:userId', uploadAvatarMiddleware, editUserController);
router.delete('/delete/:userId', deleteUserController);

module.exports = router;
