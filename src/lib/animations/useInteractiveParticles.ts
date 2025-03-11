
import { useEffect } from 'react';

// Interactive particles system
export const useInteractiveParticles = (canvasRef: React.RefObject<HTMLCanvasElement>, isActive: boolean = true) => {
  useEffect(() => {
    if (!canvasRef.current || !isActive) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas dimensions
    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      canvas.width = canvas.parentElement.offsetWidth;
      canvas.height = canvas.parentElement.offsetHeight;
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    // Mouse position
    let mouse = {
      x: canvas.width / 2,
      y: canvas.height / 2,
      active: false
    };

    // Track mouse position
    canvas.addEventListener('mousemove', (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
    });

    canvas.addEventListener('mouseleave', () => {
      mouse.active = false;
    });

    // Particle class
    class InteractiveParticle {
      x: number;
      y: number;
      originX: number;
      originY: number;
      size: number;
      color: string;
      baseColor: string;
      activeColor: string;
      vx: number;
      vy: number;
      ease: number;
      active: boolean;
      distance: number;
      angle: number;
      speed: number;
      
      constructor(x: number, y: number, color: string, activeColor: string, size: number) {
        this.x = this.originX = x;
        this.y = this.originY = y;
        this.size = size;
        this.baseColor = color;
        this.activeColor = activeColor;
        this.color = color;
        this.vx = 0;
        this.vy = 0;
        this.ease = 0.1;
        this.active = false;
        this.distance = 0;
        this.angle = 0;
        this.speed = Math.random() * 0.5 + 0.1;
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
      }

      update() {
        if (!ctx) return;
        
        if (mouse.active) {
          this.distance = Math.hypot(this.x - mouse.x, this.y - mouse.y);
          
          if (this.distance < 100) {
            this.active = true;
            this.color = this.activeColor;
            
            this.angle = Math.atan2(this.y - mouse.y, this.x - mouse.x);
            this.vx = Math.cos(this.angle) * this.speed;
            this.vy = Math.sin(this.angle) * this.speed;
          } else {
            this.active = false;
            this.color = this.baseColor;
          }
        }
        
        // If active, move away from cursor
        if (this.active) {
          this.x += this.vx;
          this.y += this.vy;
        } else {
          // Otherwise return to origin
          this.x += (this.originX - this.x) * this.ease;
          this.y += (this.originY - this.y) * this.ease;
        }
        
        this.draw();
      }
    }

    // Create particles
    const particles: InteractiveParticle[] = [];
    const gridSize = 30;
    const cols = Math.floor(canvas.width / gridSize);
    const rows = Math.floor(canvas.height / gridSize);
    
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        const x = i * gridSize + gridSize / 2;
        const y = j * gridSize + gridSize / 2;
        const baseColor = 'rgba(100, 100, 255, 0.3)';
        const activeColor = 'rgba(255, 100, 100, 0.7)';
        const size = Math.random() * 3 + 1;
        
        particles.push(new InteractiveParticle(x, y, baseColor, activeColor, size));
      }
    }

    // Animation loop
    const animate = () => {
      if (!ctx) return;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(particle => {
        particle.update();
      });
      
      requestAnimationFrame(animate);
    };

    // Store animation frame ID for cleanup
    let animationId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousemove', () => {});
      canvas.removeEventListener('mouseleave', () => {});
      cancelAnimationFrame(animationId);
    };
  }, [canvasRef, isActive]);
};
