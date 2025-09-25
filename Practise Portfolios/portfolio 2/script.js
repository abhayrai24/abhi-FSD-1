// Load dynamic data
fetch('data.json')
  .then(response => response.json())
  .then(data => {
    // Update hero
    document.querySelector('.hero-title').innerHTML = `Hi, I'm <span class="highlight">${data.profile.name}</span>`;
    document.querySelector('.hero-subtitle').textContent = data.profile.title;
    document.querySelector('.hero-description').textContent = data.profile.description;

    // Update stats
    const statsContainer = document.querySelector('.card-stats');
    statsContainer.innerHTML = data.profile.stats.map(stat => `
      <div class="stat">
        <span class="stat-number">${stat.number}</span>
        <span class="stat-label">${stat.label}</span>
      </div>
    `).join('');

    // Render projects
    const projectsContainer = document.getElementById('projects-container');
    if (projectsContainer) {
      projectsContainer.innerHTML = data.projects.map(project => `
        <div class="project-card">
          <div class="project-image">
            <img src="${project.image}" alt="${project.alt}">
            <div class="project-overlay">
              <button class="project-btn">View Details</button>
            </div>
          </div>
          <div class="project-content">
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <div class="project-tech">
              ${project.tech.map(tech => `<span>${tech}</span>`).join('')}
            </div>
          </div>
        </div>
      `).join('');
    }

    // Render skills
    const skillsContainer = document.getElementById('skills-container');
    if (skillsContainer) {
      skillsContainer.innerHTML = data.skills.map(skillCat => `
        <div class="skill-category">
          <h3>${skillCat.category}</h3>
          ${skillCat.items.map(item => `
            <div class="skill-bar">
              <div class="skill-name">${item.name}</div>
              <div class="skill-level" data-level="${item.level}"></div>
            </div>
          `).join('')}
        </div>
      `).join('');
    }

    // Update about features
    const featuresContainer = document.querySelector('.about-features');
    if (featuresContainer) {
      featuresContainer.innerHTML = data.about.features.map(feature => `
        <div class="feature">
          <span class="feature-icon">${feature.icon}</span>
          <h4>${feature.title}</h4>
          <p>${feature.description}</p>
        </div>
      `).join('');
    }

    // Update contact
    document.querySelector('.contact-item:nth-child(1) span:last-child').textContent = data.profile.contact.email;
    document.querySelector('.contact-item:nth-child(2) span:last-child').textContent = data.profile.contact.phone;
    document.querySelector('.contact-item:nth-child(3) span:last-child').textContent = data.profile.contact.location;
    const socialContainer = document.querySelector('.social-links');
    if (socialContainer) {
      socialContainer.innerHTML = data.profile.contact.social.map(social => `
        <a href="${social.url}" class="social-link">${social.name}</a>
      `).join('');
    }

    // Re-observe skill bars after rendering
    const newSkillBars = document.querySelectorAll('.skill-level');
    newSkillBars.forEach(bar => observer.observe(bar));
  })
  .catch(error => console.error('Error loading data:', error));
  // Navigation functionality
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Scroll to section function
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (navbar && window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else if (navbar) {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Animate skill bars on scroll
const skillBars = document.querySelectorAll('.skill-level');
const observerOptions = {
    threshold: 0.5
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const skillLevel = entry.target;
            const level = skillLevel.getAttribute('data-level');
            skillLevel.style.width = level;
            skillLevel.style.animation = 'fill-skill 2s ease-in-out forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

skillBars.forEach(bar => {
    observer.observe(bar);
});

// Form submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const formObject = Object.fromEntries(formData);
        
        // Simulate form submission (replace with actual API call if needed)
        console.log('Form submitted:', formObject);
        
        // Show success message
        alert('Thank you for your message! I\'ll get back to you soon.');
        this.reset();
    });
}

// Typing animation for hero text
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing animation when hero section is in view
const heroTitle = document.querySelector('.hero-title');
if (heroTitle) {
    const heroObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const text = heroTitle.textContent;
                typeWriter(heroTitle, text, 100);
                heroObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    heroObserver.observe(heroTitle);
}

// Parallax effect for background shapes
window.addEventListener('scroll', () => {
    const shapes = document.querySelectorAll('.shape');
    const scrollY = window.scrollY;
    
    shapes.forEach((shape, index) => {
        const speed = 0.5 + (index * 0.1);
        shape.style.transform = `translateY(${scrollY * speed}px) rotate(${scrollY * 0.1}deg)`;
    });
});

// Project card hover effect enhancement
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// Initialize animations when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Add loading animation class
    document.body.classList.add('loaded');
    
    // Initialize any other animations here
    console.log('Portfolio loaded successfully!');
});

// Add scroll progress indicator
let scrollProgress = null;
window.addEventListener('scroll', () => {
    if (!scrollProgress) {
        scrollProgress = document.createElement('div');
        scrollProgress.style.position = 'fixed';
        scrollProgress.style.top = '0';
        scrollProgress.style.left = '0';
        scrollProgress.style.height = '3px';
        scrollProgress.style.background = 'linear-gradient(135deg, #6366f1, #8b5cf6)';
        scrollProgress.style.width = '0%';
        scrollProgress.style.zIndex = '1001';
        scrollProgress.style.transition = 'width 0.1s ease';
        scrollProgress.id = 'scroll-progress';
        document.body.appendChild(scrollProgress);
    }
    
    const scrollTop = window.scrollY;
    const docHeight = document.body.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    scrollProgress.style.width = `${scrollPercent}%`;
});

// Add keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault();
        const sections = document.querySelectorAll('section');
        const currentSectionIndex = Array.from(sections).findIndex(section => {
            const rect = section.getBoundingClientRect();
            return rect.top >= 0 && rect.top <= window.innerHeight / 2;
        });
        
        if (e.key === 'ArrowDown' && currentSectionIndex < sections.length - 1) {
            sections[currentSectionIndex + 1].scrollIntoView({ behavior: 'smooth' });
        } else if (e.key === 'ArrowUp' && currentSectionIndex > 0) {
            sections[currentSectionIndex - 1].scrollIntoView({ behavior: 'smooth' });
        }
    }
});

// Add touch swipe support for mobile
let touchStartY = 0;
let touchEndY = 0;

document.addEventListener('touchstart', (e) => {
    touchStartY = e.changedTouches[0].screenY;
});

document.addEventListener('touchend', (e) => {
    touchEndY = e.changedTouches[0].screenY;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    
    if (touchStartY - touchEndY > swipeThreshold) {
        // Swipe up - scroll down
        scrollToNextSection();
    } else if (touchEndY - touchStartY > swipeThreshold) {
        // Swipe down - scroll up
        scrollToPreviousSection();
    }
}

function scrollToNextSection() {
    const sections = document.querySelectorAll('section');
    const currentSectionIndex = Array.from(sections).findIndex(section => {
        const rect = section.getBoundingClientRect();
        return rect.top >= 0 && rect.top <= window.innerHeight / 2;
    });
    
    if (currentSectionIndex < sections.length - 1) {
        sections[currentSectionIndex + 1].scrollIntoView({ behavior: 'smooth' });
    }
}

function scrollToPreviousSection() {
    const sections = document.querySelectorAll('section');
    const currentSectionIndex = Array.from(sections).findIndex(section => {
        const rect = section.getBoundingClientRect();
        return rect.top >= 0 && rect.top <= window.innerHeight / 2;
    });
    
    if (currentSectionIndex > 0) {
        sections[currentSectionIndex - 1].scrollIntoView({ behavior: 'smooth' });
    }
}