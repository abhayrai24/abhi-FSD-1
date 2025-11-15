const Admin = require('../models/Admin');
const jwt = require('jsonwebtoken');

// Admin login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Check if admin exists
    const admin = await Admin.findOne({ email });
    
    if (!admin) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }
    
    // Verify password
    const isPasswordValid = await admin.comparePassword(password);
    
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }
    
    // Generate JWT token
    const token = jwt.sign(
      { id: admin._id, email: admin.email },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );
    
    res.json({
      success: true,
      message: 'Login successful',
      token,
      admin: {
        id: admin._id,
        email: admin.email
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error during login',
      error: error.message
    });
  }
};

// Get dashboard statistics
exports.getDashboardStats = async (req, res) => {
  try {
    const Course = require('../models/Course');
    const Enrollment = require('../models/Enrollment');
    const Contact = require('../models/Contact');
    
    const totalCourses = await Course.countDocuments({ isActive: true });
    const totalEnrollments = await Enrollment.countDocuments();
    const pendingEnrollments = await Enrollment.countDocuments({ status: 'Pending' });
    const totalContacts = await Contact.countDocuments();
    const newContacts = await Contact.countDocuments({ status: 'New' });
    
    // Get recent enrollments
    const recentEnrollments = await Enrollment.find()
      .populate('course')
      .sort({ createdAt: -1 })
      .limit(5);
    
    res.json({
      success: true,
      data: {
        totalCourses,
        totalEnrollments,
        pendingEnrollments,
        totalContacts,
        newContacts,
        recentEnrollments
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching dashboard stats',
      error: error.message
    });
  }
};
