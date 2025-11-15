const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');
const authMiddleware = require('../middleware/auth');
const { courseValidation, validate } = require('../middleware/validator');

// Public routes
router.get('/', courseController.getAllCourses);
router.get('/:id', courseController.getCourse);

// Protected routes (Admin only)
router.post('/', authMiddleware, courseValidation, validate, courseController.createCourse);
router.put('/:id', authMiddleware, courseValidation, validate, courseController.updateCourse);
router.delete('/:id', authMiddleware, courseController.deleteCourse);

module.exports = router;
