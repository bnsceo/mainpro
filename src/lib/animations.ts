import { useEffect, useState, useRef } from 'react';

// Simple intersection observer hook for animations
export const useInView = (options = {}, once = true) => {
  const ref = useRef<HTMLElement | null>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsInView(true);
        if (once && ref.current) {
          observer.unobserve(ref.current);
        }
      } else if (!once) {
        setIsInView(false);
      }
    }, options);

    observer.observe(ref.current);

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [options, once]);

  return { ref, isInView };
};

// Canvas particle animation
export const useParticleCanvas = (canvasRef: React.RefObject<HTMLCanvasElement>, color = '#ffffff', count = 100) => {
  useEffect(() => {
    if (!canvasRef.current) return;

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

    // Particle class
    class Particle {
      x: number;
      y: number;
      radius: number;
      color: string;
      velocity: { x: number; y: number };

      constructor(x: number, y: number, radius: number, color: string, velocity: { x: number; y: number }) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.velocity = velocity;
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
      }

      update() {
        this.x += this.velocity.x;
        this.y += this.velocity.y;

        // Bounce off edges
        if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
          this.velocity.x = -this.velocity.x;
        }

        if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
          this.velocity.y = -this.velocity.y;
        }

        this.draw();
      }
    }

    // Create particles
    const particles: Particle[] = [];
    for (let i = 0; i < count; i++) {
      const radius = Math.random() * 2 + 1;
      const x = Math.random() * (canvas.width - radius * 2) + radius;
      const y = Math.random() * (canvas.height - radius * 2) + radius;
      const velocity = {
        x: (Math.random() - 0.5) * 1,
        y: (Math.random() - 0.5) * 1,
      };
      const alpha = Math.random() * 0.5 + 0.1;
      const particleColor = color.replace(')', `, ${alpha})`).replace('rgb', 'rgba');
      
      particles.push(new Particle(x, y, radius, particleColor, velocity));
    }

    // Animation loop
    const animate = () => {
      if (!ctx) return;
      requestAnimationFrame(animate);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach((particle) => {
        particle.update();
      });
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [canvasRef, color, count]);
};

// Connection canvas animation
export const useConnectionCanvas = (canvasRef: React.RefObject<HTMLCanvasElement>) => {
  useEffect(() => {
    if (!canvasRef.current) return;

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

    // Node class
    class Node {
      x: number;
      y: number;
      radius: number;
      color: string;
      velocity: { x: number; y: number };

      constructor(x: number, y: number, radius: number) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = '#7b68ee';
        this.velocity = {
          x: (Math.random() - 0.5) * 2,
          y: (Math.random() - 0.5) * 2,
        };
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
      }

      update() {
        this.x += this.velocity.x;
        this.y += this.velocity.y;

        // Bounce off edges
        if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
          this.velocity.x = -this.velocity.x;
        }

        if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
          this.velocity.y = -this.velocity.y;
        }

        this.draw();
      }
    }

    // Create nodes
    const nodes: Node[] = [];
    for (let i = 0; i < 20; i++) {
      const radius = 4;
      const x = Math.random() * (canvas.width - radius * 2) + radius;
      const y = Math.random() * (canvas.height - radius * 2) + radius;
      
      nodes.push(new Node(x, y, radius));
    }

    // Animation loop
    const animate = () => {
      if (!ctx) return;
      requestAnimationFrame(animate);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update nodes
      nodes.forEach(node => {
        node.update();
      });
      
      // Draw connections
      nodes.forEach((node, i) => {
        nodes.forEach((otherNode, j) => {
          if (i !== j) {
            const dx = node.x - otherNode.x;
            const dy = node.y - otherNode.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 150) {
              ctx.beginPath();
              ctx.moveTo(node.x, node.y);
              ctx.lineTo(otherNode.x, otherNode.y);
              const opacity = 1 - distance / 150;
              ctx.strokeStyle = `rgba(123, 104, 238, ${opacity})`;
              ctx.lineWidth = 1;
              ctx.stroke();
            }
          }
        });
      });
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [canvasRef]);
};

// Stick figure animation
export const useStickFigureAnimation = (canvasRef: React.RefObject<HTMLCanvasElement>) => {
  useEffect(() => {
    if (!canvasRef.current) return;

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

    const figureHeight = 100;
    const figureWidth = 50;
    
    // Animation variables
    let frame = 0;
    const totalFrames = 60;
    let direction = 1; // 1 for right, -1 for left
    
    // Stick figure position
    let posX = 50;
    const posY = canvas.height / 2;
    
    // Draw stick figure function
    const drawStickFigure = (x: number, y: number, frame: number, direction: number) => {
      if (!ctx) return;
      
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Calculate animation progress for walking motion
      const progress = frame / totalFrames;
      const legAngle = Math.sin(progress * Math.PI * 2) * 0.3;
      const armAngle = Math.sin((progress * Math.PI * 2) + Math.PI) * 0.3;
      
      // Save context
      ctx.save();
      
      // Move to position and apply direction
      ctx.translate(x, y);
      if (direction < 0) {
        ctx.scale(-1, 1);
      }
      
      // Set line style
      ctx.lineWidth = 3;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.strokeStyle = '#ffffff';
      
      // Draw head
      ctx.beginPath();
      ctx.arc(0, -figureHeight/2 + 10, 15, 0, Math.PI * 2);
      ctx.stroke();
      
      // Draw body
      ctx.beginPath();
      ctx.moveTo(0, -figureHeight/2 + 25);
      ctx.lineTo(0, 10);
      ctx.stroke();
      
      // Draw arms
      ctx.beginPath();
      ctx.moveTo(0, -figureHeight/4);
      ctx.lineTo(-figureWidth/2 * Math.cos(armAngle), -figureHeight/4 + figureHeight/4 * Math.sin(armAngle));
      ctx.stroke();
      
      ctx.beginPath();
      ctx.moveTo(0, -figureHeight/4);
      ctx.lineTo(figureWidth/2 * Math.cos(armAngle), -figureHeight/4 + figureHeight/4 * Math.sin(armAngle));
      ctx.stroke();
      
      // Draw legs
      ctx.beginPath();
      ctx.moveTo(0, 10);
      ctx.lineTo(-figureWidth/2 * Math.cos(legAngle), figureHeight/2 * Math.sin(legAngle) + 10);
      ctx.stroke();
      
      ctx.beginPath();
      ctx.moveTo(0, 10);
      ctx.lineTo(figureWidth/2 * Math.cos(legAngle), figureHeight/2 * Math.sin(-legAngle) + 10);
      ctx.stroke();
      
      // Restore context
      ctx.restore();
      
      // Add creative/coding message
      ctx.font = '16px monospace';
      ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
      ctx.textAlign = 'center';
      
      const messages = [
        "Creating digital experiences...",
        "Crafting with code and design...",
        "Building the future...",
        "Transforming ideas into reality..."
      ];
      
      const messageIndex = Math.floor(progress * messages.length) % messages.length;
      const message = messages[messageIndex];
      
      const bubbleWidth = ctx.measureText(message).width + 20;
      const bubbleHeight = 30;
      const bubbleX = direction > 0 ? x + 20 : x - 20;
      const bubbleY = y - figureHeight/2 - 20;
      
      // Draw speech bubble
      ctx.beginPath();
      ctx.roundRect(bubbleX - bubbleWidth/2, bubbleY - bubbleHeight/2, bubbleWidth, bubbleHeight, 10);
      ctx.fillStyle = 'rgba(30, 30, 30, 0.8)';
      ctx.fill();
      
      // Draw text
      ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
      ctx.fillText(message, bubbleX, bubbleY + 5);
    };
    
    // Animation loop
    const animate = () => {
      if (!ctx) return;
      
      // Update position
      posX += direction * 2;
      
      // Reverse direction at edges
      if (posX > canvas.width - 100) {
        direction = -1;
      } else if (posX < 100) {
        direction = 1;
      }
      
      // Draw stick figure
      drawStickFigure(posX, posY, frame, direction);
      
      // Increment frame
      frame = (frame + 1) % totalFrames;
      
      // Continue animation
      requestAnimationFrame(animate);
    };
    
    // Start animation
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [canvasRef]);
};

// Interactive particles system
export const useInteractiveParticles = (canvasRef: React.RefObject<HTMLCanvasElement>) => {
  useEffect(() => {
    if (!canvasRef.current) return;

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

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [canvasRef]);
};

// Typewriter effect hook
export const useTypewriter = (text: string, speed = 100, delay = 1000) => {
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  
  useEffect(() => {
    let i = 0;
    let timeout: NodeJS.Timeout;
    
    if (isTyping) {
      const typing = () => {
        if (i < text.length) {
          setDisplayText(prev => prev + text.charAt(i));
          i++;
          timeout = setTimeout(typing, speed);
        } else {
          setIsTyping(false);
          timeout = setTimeout(() => setIsTyping(true), delay);
        }
      };
      
      timeout = setTimeout(typing, delay);
    } else {
      const erasing = () => {
        if (i > 0) {
          i--;
          setDisplayText(text.substring(0, i));
          timeout = setTimeout(erasing, speed / 2);
        } else {
          setIsTyping(true);
        }
      };
      
      timeout = setTimeout(erasing, delay);
    }
    
    return () => clearTimeout(timeout);
  }, [text, speed, delay, isTyping]);
  
  return displayText;
};
