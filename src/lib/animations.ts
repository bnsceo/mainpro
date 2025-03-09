
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
