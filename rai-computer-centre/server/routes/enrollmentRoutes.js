const express = require('express');
const router = express.Router();
const enrollmentController = require('../controllers/enrollmentController');
const authMiddleware = require('../middleware/auth');
const { enrollmentValidation, validate } = require('../middleware/validator');

// Public route
router.post('/', enrollmentValidation, validate, enrollmentController.createEnrollment);

// Protected routes (Admin only)
router.get('/', authMiddleware, enrollmentController.getAllEnrollments);
router.get('/:id', authMiddleware, enrollmentController.getEnrollment);
router.put('/:id/status', authMiddleware, enrollmentController.updateEnrollmentStatus);
router.delete('/:id', authMiddleware, enrollmentController.deleteEnrollment);

module.exports = router;
