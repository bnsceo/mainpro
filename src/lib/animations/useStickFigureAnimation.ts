
import { useEffect } from 'react';

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
