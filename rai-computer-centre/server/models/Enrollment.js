const mongoose = require('mongoose');

const enrollmentSchema = new mongoose.Schema({
  studentName: {
    type: String,
    required: [true, 'Student name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email']
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    match: [/^[0-9]{10}$/, 'Please provide a valid 10-digit phone number']
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: [true, 'Course selection is required']
  },
  address: {
    type: String,
    required: [true, 'Address is required']
  },
  qualification: {
    type: String,
    required: [true, 'Qualification is required']
  },
  startDate: {
    type: Date,
    required: [true, 'Preferred start date is required']
  },
  status: {
    type: String,
    enum: ['Pending', 'Confirmed', 'Completed', 'Cancelled'],
    default: 'Pending'
  },
  message: {
    type: String
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Enrollment', enrollmentSchema);
