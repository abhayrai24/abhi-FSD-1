// API Base URL
const API_URL = window.location.origin + '/api';

// API Helper Functions
const api = {
  // Get all courses
  async getCourses(filters = {}) {
    try {
      const queryParams = new URLSearchParams(filters).toString();
      const url = `${API_URL}/courses${queryParams ? '?' + queryParams : ''}`;
      const response = await fetch(url);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching courses:', error);
      throw error;
    }
  },

  // Get single course
  async getCourse(id) {
    try {
      const response = await fetch(`${API_URL}/courses/${id}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching course:', error);
      throw error;
    }
  },

  // Create enrollment
  async createEnrollment(enrollmentData) {
    try {
      const response = await fetch(`${API_URL}/enrollments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(enrollmentData)
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error creating enrollment:', error);
      throw error;
    }
  },

  // Create contact
  async createContact(contactData) {
    try {
      const response = await fetch(`${API_URL}/contacts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(contactData)
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error creating contact:', error);
      throw error;
    }
  },

  // Admin login
  async login(credentials) {
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error during login:', error);
      throw error;
    }
  },

  // Get dashboard stats (Admin)
  async getDashboardStats(token) {
    try {
      const response = await fetch(`${API_URL}/auth/dashboard/stats`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
      throw error;
    }
  },

  // Get all enrollments (Admin)
  async getEnrollments(token, filters = {}) {
    try {
      const queryParams = new URLSearchParams(filters).toString();
      const url = `${API_URL}/enrollments${queryParams ? '?' + queryParams : ''}`;
      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching enrollments:', error);
      throw error;
    }
  },

  // Update enrollment status (Admin)
  async updateEnrollmentStatus(token, id, status) {
    try {
      const response = await fetch(`${API_URL}/enrollments/${id}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status })
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error updating enrollment:', error);
      throw error;
    }
  },

  // Delete enrollment (Admin)
  async deleteEnrollment(token, id) {
    try {
      const response = await fetch(`${API_URL}/enrollments/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error deleting enrollment:', error);
      throw error;
    }
  },

  // Get all contacts (Admin)
  async getContacts(token, filters = {}) {
    try {
      const queryParams = new URLSearchParams(filters).toString();
      const url = `${API_URL}/contacts${queryParams ? '?' + queryParams : ''}`;
      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching contacts:', error);
      throw error;
    }
  },

  // Create course (Admin)
  async createCourse(token, courseData) {
    try {
      const response = await fetch(`${API_URL}/courses`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(courseData)
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error creating course:', error);
      throw error;
    }
  },

  // Update course (Admin)
  async updateCourse(token, id, courseData) {
    try {
      const response = await fetch(`${API_URL}/courses/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(courseData)
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error updating course:', error);
      throw error;
    }
  },

  // Delete course (Admin)
  async deleteCourse(token, id) {
    try {
      const response = await fetch(`${API_URL}/courses/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error deleting course:', error);
      throw error;
    }
  }
};

// Utility Functions
function showAlert(message, type = 'success') {
  const alertDiv = document.createElement('div');
  alertDiv.className = `alert alert-${type} show`;
  alertDiv.textContent = message;
  
  const container = document.querySelector('.container') || document.body;
  container.insertBefore(alertDiv, container.firstChild);
  
  setTimeout(() => {
    alertDiv.classList.remove('show');
    setTimeout(() => alertDiv.remove(), 300);
  }, 5000);
}

function showLoading(show = true) {
  const loading = document.querySelector('.loading');
  if (loading) {
    loading.classList.toggle('show', show);
  }
}

function formatDate(dateString) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-US', options);
}

function formatCurrency(amount) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
}

// Mobile menu toggle
document.addEventListener('DOMContentLoaded', () => {
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const navMenu = document.querySelector('.nav-menu');
  
  if (mobileMenuBtn && navMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      navMenu.classList.toggle('active');
    });
  }

  // Set active nav link
  const currentPage = window.location.pathname;
  const navLinks = document.querySelectorAll('.nav-menu a');
  navLinks.forEach(link => {
    if (link.getAttribute('href') === currentPage || 
        (currentPage === '/' && link.getAttribute('href') === '/')) {
      link.classList.add('active');
    }
  });
});
