const Enrollment = require('../models/Enrollment');
const Course = require('../models/Course');

// Create enrollment
exports.createEnrollment = async (req, res) => {
  try {
    const enrollment = await Enrollment.create(req.body);
    
    // Increment enrolled students count
    await Course.findByIdAndUpdate(req.body.course, {
      $inc: { enrolledStudents: 1 }
    });
    
    // Populate course details
    await enrollment.populate('course');
    
    res.status(201).json({
      success: true,
      message: 'Enrollment submitted successfully! We will contact you soon.',
      data: enrollment
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error submitting enrollment',
      error: error.message
    });
  }
};

// Get all enrollments (Admin only)
exports.getAllEnrollments = async (req, res) => {
  try {
    const { status } = req.query;
    let filter = {};
    
    if (status) filter.status = status;
    
    const enrollments = await Enrollment.find(filter)
      .populate('course')
      .sort({ createdAt: -1 });
    
    res.json({
      success: true,
      count: enrollments.length,
      data: enrollments
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching enrollments',
      error: error.message
    });
  }
};

// Get single enrollment
exports.getEnrollment = async (req, res) => {
  try {
    const enrollment = await Enrollment.findById(req.params.id).populate('course');
    
    if (!enrollment) {
      return res.status(404).json({
        success: false,
        message: 'Enrollment not found'
      });
    }
    
    res.json({
      success: true,
      data: enrollment
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching enrollment',
      error: error.message
    });
  }
};

// Update enrollment status (Admin only)
exports.updateEnrollmentStatus = async (req, res) => {
  try {
    const { status } = req.body;
    
    const enrollment = await Enrollment.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    ).populate('course');
    
    if (!enrollment) {
      return res.status(404).json({
        success: false,
        message: 'Enrollment not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Enrollment status updated successfully',
      data: enrollment
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error updating enrollment',
      error: error.message
    });
  }
};

// Delete enrollment (Admin only)
exports.deleteEnrollment = async (req, res) => {
  try {
    const enrollment = await Enrollment.findByIdAndDelete(req.params.id);
    
    if (!enrollment) {
      return res.status(404).json({
        success: false,
        message: 'Enrollment not found'
      });
    }
    
    // Decrement enrolled students count
    await Course.findByIdAndUpdate(enrollment.course, {
      $inc: { enrolledStudents: -1 }
    });
    
    res.json({
      success: true,
      message: 'Enrollment deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting enrollment',
      error: error.message
    });
  }
};
