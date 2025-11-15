const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Course name is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Course description is required']
  },
  duration: {
    type: String,
    required: [true, 'Course duration is required']
  },
  fees: {
    type: Number,
    required: [true, 'Course fees is required']
  },
  category: {
    type: String,
    required: [true, 'Course category is required'],
    enum: ['Programming', 'Web Development', 'Office Applications', 'Graphics Design', 'Database', 'Networking', 'Other']
  },
  instructor: {
    type: String,
    required: [true, 'Instructor name is required']
  },
  image: {
    type: String,
    default: 'default-course.jpg'
  },
  syllabus: [{
    type: String
  }],
  level: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Advanced'],
    default: 'Beginner'
  },
  isActive: {
    type: Boolean,
    default: true
  },
  enrolledStudents: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Course', courseSchema);
