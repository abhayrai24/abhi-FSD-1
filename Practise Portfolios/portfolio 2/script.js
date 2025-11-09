// Fetch and load dynamic data from data.json
fetch('data.json')
  .then(response => response.json())
  .then(data => {
    // Update hero section
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
      heroTitle.innerHTML = `Hi, I'm <span class="highlight">${data.profile.name}</span>`;
    }
    const heroSubtitle = document.querySelector('.hero-subtitle');
    if (heroSubtitle) {
      heroSubtitle.textContent = data.profile.title;
    }
    const heroDescription = document.querySelector('.hero-description');
    if (heroDescription) {
      heroDescription.textContent = data.profile.description;
    }

    // Update stats in floating card
    const statsContainer = document.querySelector('.card-stats');
    if (statsContainer) {
      statsContainer.innerHTML = data.profile.stats.map(stat => `
        <div class="stat">
          <span class="stat-number">${stat.number}</span>
          <span class="stat-label">${stat.label}</span>
        </div>
      `).join('');
    }

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

    // Render about features
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

    // Update contact info
    const contactEmail = document.querySelector('.contact-item:nth-child(1) span:last-child');
    if (contactEmail) contactEmail.textContent = data.profile.contact.email;

    const contactPhone = document.querySelector('.contact-item:nth-child(2) span:last-child');
    if (contactPhone) contactPhone.textContent = data.profile.contact.phone;

    const contactLocation = document.querySelector('.contact-item:nth-child(3) span:last-child');
    if (contactLocation) contactLocation.textContent = data.profile.contact.location;

    // Render social links
    const socialContainer = document.querySelector('.social-links');
    if (socialContainer) {
      socialContainer.innerHTML = data.profile.contact.social.map(social => `
        <a href="${social.url}" class="social-link" target="_blank" rel="noopener noreferrer">${social.name}</a>
      `).join('');
    }

    // Observe skill bars for animation
    const skillBars = document.querySelectorAll('.skill-level');
    skillBars.forEach(bar => observer.observe(bar));
  })
  .catch(error => console.error('Error loading data:', error));

// Hamburger menu toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
  });
}

// Close mobile menu on nav link click
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
  });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// Scroll to section helper function
function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

// Navbar background change on scroll
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;

  if (window.scrollY > 100) {
    navbar.style.background = 'rgba(255, 255, 255, 0.98)';
    navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
  } else {
    navbar.style.background = 'rgba(255, 255, 255, 0.95)';
    navbar.style.boxShadow = 'none';
  }
});

// Intersection Observer for skill bar animations
const observerOptions = { threshold: 0.5 };
const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const skillLevel = entry.target;
      const level = skillLevel.getAttribute('data-level');
      skillLevel.style.width = level;
      skillLevel.style.animation = 'fill-skill 2s ease-in-out forwards';
      observer.unobserve(skillLevel);
    }
  });
}, observerOptions);

// Contact form submission handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const formData = new FormData(this);
    const formObject = Object.fromEntries(formData.entries());

    // Here you can add actual form submission logic (e.g., API call)
    console.log('Form submitted:', formObject);

    alert('Thank you for your message! I\'ll get back to you soon.');
    this.reset();
  });
}

// Typing animation for hero title
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

// Initialize typing animation when hero title is visible
const heroTitle = document.querySelector('.hero-title');
if (heroTitle) {
  const heroObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const text = heroTitle.textContent;
        typeWriter(heroTitle, text, 100);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  heroObserver.observe(heroTitle);
}

// Parallax effect for background shapes on scroll
window.addEventListener('scroll', () => {
  const shapes = document.querySelectorAll('.shape');
  const scrollY = window.scrollY;

  shapes.forEach((shape, index) => {
    const speed = 0.5 + index * 0.1;
    shape.style.transform = `translateY(${scrollY * speed}px) rotate(${scrollY * 0.1}deg)`;
  });
});

// Project card hover effect enhancement
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mouseenter', () => {
    card.style.transform = 'translateY(-10px) scale(1.02)';
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'translateY(0) scale(1)';
  });
});

// Scroll progress indicator
let scrollProgress = null;
window.addEventListener('scroll', () => {
  if (!scrollProgress) {
    scrollProgress = document.createElement('div');
    scrollProgress.id = 'scroll-progress';
    Object.assign(scrollProgress.style, {
      position: 'fixed',
      top: '0',
      left: '0',
      height: '3px',
      background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
      width: '0%',
      zIndex: '1001',
      transition: 'width 0.1s ease'
    });
    document.body.appendChild(scrollProgress);
  }

  const scrollTop = window.scrollY;
  const docHeight = document.body.scrollHeight - window.innerHeight;
  const scrollPercent = (scrollTop / docHeight) * 100;
  scrollProgress.style.width = `${scrollPercent}%`;
});

// Keyboard navigation between sections (Arrow Up/Down)
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
    e.preventDefault();
    const sections = Array.from(document.querySelectorAll('section'));
    const currentIndex = sections.findIndex(section => {
      const rect = section.getBoundingClientRect();
      return rect.top >= 0 && rect.top <= window.innerHeight / 2;
    });

    if (e.key === 'ArrowDown' && currentIndex < sections.length - 1) {
      sections[currentIndex + 1].scrollIntoView({ behavior: 'smooth' });
    } else if (e.key === 'ArrowUp' && currentIndex > 0) {
      sections[currentIndex - 1].scrollIntoView({ behavior: 'smooth' });
    }
  }
});

// Touch swipe support for mobile devices
let touchStartY = 0;
let touchEndY = 0;

document.addEventListener('touchstart', e => {
  touchStartY = e.changedTouches[0].screenY;
});

document.addEventListener('touchend', e => {
  touchEndY = e.changedTouches[0].screenY;
  handleSwipe();
});

function handleSwipe() {
  const swipeThreshold = 50;
  if (touchStartY - touchEndY > swipeThreshold) {
    scrollToNextSection();
  } else if (touchEndY - touchStartY > swipeThreshold) {
    scrollToPreviousSection();
  }
}

function scrollToNextSection() {
  const sections = Array.from(document.querySelectorAll('section'));
  const currentIndex = sections.findIndex(section => {
    const rect = section.getBoundingClientRect();
    return rect.top >= 0 && rect.top <= window.innerHeight / 2;
  });
  if (currentIndex < sections.length - 1) {
    sections[currentIndex + 1].scrollIntoView({ behavior: 'smooth' });
  }
}

function scrollToPreviousSection() {
  const sections = Array.from(document.querySelectorAll('section'));
  const currentIndex = sections.findIndex(section => {
    const rect = section.getBoundingClientRect();
    return rect.top >= 0 && rect.top <= window.innerHeight / 2;
  });
  if (currentIndex > 0) {
    sections[currentIndex - 1].scrollIntoView({ behavior: 'smooth' });
  }
}

// Service Worker registration for PWA
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then(reg => console.log('Service Worker registered:', reg))
      .catch(err => console.log('Service Worker registration failed:', err));
  });
}