const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/auth');

// Public route
router.post('/login', authController.login);

// Protected route
router.get('/dashboard/stats', authMiddleware, authController.getDashboardStats);

module.exports = router;
