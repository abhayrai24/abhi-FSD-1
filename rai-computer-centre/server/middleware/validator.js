const { body, validationResult } = require('express-validator');

// Validation middleware
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ 
      success: false, 
      errors: errors.array() 
    });
  }
  next();
};

// Enrollment validation rules
const enrollmentValidation = [
  body('studentName').trim().notEmpty().withMessage('Student name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('phone').matches(/^[0-9]{10}$/).withMessage('Valid 10-digit phone number is required'),
  body('course').notEmpty().withMessage('Course selection is required'),
  body('address').trim().notEmpty().withMessage('Address is required'),
  body('qualification').trim().notEmpty().withMessage('Qualification is required'),
  body('startDate').isISO8601().withMessage('Valid start date is required')
];

// Contact validation rules
const contactValidation = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('phone').trim().notEmpty().withMessage('Phone number is required'),
  body('subject').trim().notEmpty().withMessage('Subject is required'),
  body('message').trim().notEmpty().withMessage('Message is required')
];

// Course validation rules
const courseValidation = [
  body('name').trim().notEmpty().withMessage('Course name is required'),
  body('description').trim().notEmpty().withMessage('Course description is required'),
  body('duration').trim().notEmpty().withMessage('Duration is required'),
  body('fees').isNumeric().withMessage('Fees must be a number'),
  body('category').trim().notEmpty().withMessage('Category is required'),
  body('instructor').trim().notEmpty().withMessage('Instructor name is required')
];

module.exports = {
  validate,
  enrollmentValidation,
  contactValidation,
  courseValidation
};
