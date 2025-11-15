const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');
const authMiddleware = require('../middleware/auth');
const { contactValidation, validate } = require('../middleware/validator');

// Public route
router.post('/', contactValidation, validate, contactController.createContact);

// Protected routes (Admin only)
router.get('/', authMiddleware, contactController.getAllContacts);
router.put('/:id/status', authMiddleware, contactController.updateContactStatus);
router.delete('/:id', authMiddleware, contactController.deleteContact);

module.exports = router;
