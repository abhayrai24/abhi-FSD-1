// Advanced Particle Animation System
class ParticleSystem {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas?.getContext('2d');
    if (!this.canvas || !this.ctx) return;

    this.resizeCanvas();
    this.particles = [];
    this.mouse = { x: null, y: null };
    this.initParticles();
    this.animate();

    // Mouse interaction
    document.addEventListener('mousemove', (e) => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
    });

    // Reset mouse position when leaving window
    document.addEventListener('mouseout', () => {
      this.mouse.x = null;
      this.mouse.y = null;
    });

    // Resize handler
    window.addEventListener('resize', () => this.resizeCanvas());
  }

  resizeCanvas() {
    if (!this.canvas) return;
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  initParticles() {
    const numParticles = 100;
    for (let i = 0; i < numParticles; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        radius: Math.random() * 3 + 1,
        color: `hsl(${Math.random() * 360}, 70%, 60%)`,
        opacity: Math.random() * 0.5 + 0.2
      });
    }
  }

  animate() {
    if (!this.ctx || !this.canvas) return;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.particles.forEach(particle => {
      // Physics: attract to mouse if mouse is inside window
      if (this.mouse.x !== null && this.mouse.y !== null) {
        const dx = this.mouse.x - particle.x;
        const dy = this.mouse.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < 100 && distance > 0) {
          particle.vx += (dx / distance) * 0.05;
          particle.vy += (dy / distance) * 0.05;
        }
      }

      // Update position
      particle.x += particle.vx;
      particle.y += particle.vy;
      particle.vx *= 0.98; // Friction
      particle.vy *= 0.98;

      // Bounce off edges
      if (particle.x < 0) {
        particle.x = 0;
        particle.vx *= -1;
      } else if (particle.x > this.canvas.width) {
        particle.x = this.canvas.width;
        particle.vx *= -1;
      }
      if (particle.y < 0) {
        particle.y = 0;
        particle.vy *= -1;
      } else if (particle.y > this.canvas.height) {
        particle.y = this.canvas.height;
        particle.vy *= -1;
      }

      // Draw particle
      this.ctx.beginPath();
      this.ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
      this.ctx.fillStyle = particle.color;
      this.ctx.globalAlpha = particle.opacity;
      this.ctx.fill();
    });

    this.ctx.globalAlpha = 1;
    requestAnimationFrame(() => this.animate());
  }
}

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
  new ParticleSystem('particles-canvas');
});