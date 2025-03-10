
import { useEffect } from 'react';

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
