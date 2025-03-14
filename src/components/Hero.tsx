import React from "react";
import { useParticleCanvas } from "@/lib/animations";
import { cn } from "@/lib/utils";
import { useInView } from "@/lib/animations";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowDown } from "lucide-react";
import CyberpunkTerminal from "./CyberpunkTerminal";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Hero: React.FC = () => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const { ref, isInView } = useInView({}, true);
  
  // Initialize particle canvas after component mounts
  React.useEffect(() => {
    const canvas = canvasRef.current;
    let cleanup: (() => void) | undefined;
    
    if (canvas) {
      // Call the hook function inside the component body, not inside useEffect
      const initParticles = () => {
        const particles = useParticleCanvas(canvasRef, 'rgb(255, 255, 255)', 80);
        return particles;
      };
      
      // Instead, use the canvas directly
      const ctx = canvas.getContext('2d');
      if (ctx) {
        // Set canvas dimensions
        const handleResize = () => {
          if (!canvas || !canvas.parentElement) return;
          canvas.width = canvas.parentElement.offsetWidth;
          canvas.height = canvas.parentElement.offsetHeight;
        };
        
        handleResize();
        window.addEventListener('resize', handleResize);
        
        // Create particles
        const particles: any[] = [];
        for (let i = 0; i < 80; i++) {
          const radius = Math.random() * 2 + 1;
          const x = Math.random() * (canvas.width - radius * 2) + radius;
          const y = Math.random() * (canvas.height - radius * 2) + radius;
          const velocity = {
            x: (Math.random() - 0.5) * 1,
            y: (Math.random() - 0.5) * 1,
          };
          const alpha = Math.random() * 0.5 + 0.1;
          const particleColor = `rgba(255, 255, 255, ${alpha})`;
          
          particles.push(new Particle(x, y, radius, particleColor, velocity));
        }
        
        // Animation loop
        let animationFrameId: number;
        const animate = () => {
          animationFrameId = requestAnimationFrame(animate);
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          
          particles.forEach((particle) => {
            particle.update();
          });
        };
        
        animate();
        
        // Set cleanup function
        cleanup = () => {
          window.removeEventListener('resize', handleResize);
          cancelAnimationFrame(animationFrameId);
        };
      }
    }
    
    // Return cleanup function
    return () => {
      if (cleanup) cleanup();
    };
  }, []);

  // Particle class definition
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
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
      ctx.fillStyle = this.color;
      ctx.fill();
    }

    update() {
      const canvas = canvasRef.current;
      if (!canvas) return;
      
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

  const scrollToNext = () => {
    const aboutSection = document.getElementById("about");
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      ref={ref as React.RefObject<HTMLDivElement>}
      className="relative min-h-screen flex items-center justify-center overflow-hidden animated-bg py-20"
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full z-0"
      />

      <div className="container relative z-10 px-4 py-16 mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div 
            className={cn(
              "flex flex-col space-y-6 text-center lg:text-left transition-all duration-700",
              isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
            )}
          >
            <div className="flex flex-col items-center lg:items-start space-y-6">
              <Avatar className="w-32 h-32 border-4 border-primary/20 shadow-xl shadow-primary/20">
                <AvatarImage src="https://github.com/shadcn.png" alt="Anderson Paulino" />
                <AvatarFallback className="bg-primary/5 text-2xl font-bold">AP</AvatarFallback>
              </Avatar>
              
              <div>
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                  Anderson <span className="highlight">Paulino</span>
                </h1>
                <p className="text-xl mt-2 text-foreground/80">Digital Alchemist</p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-4 mt-4">
              <Button 
                asChild
                className="btn-primary group"
              >
                <a href="#portfolio">
                  View My Work 
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
              </Button>
              
              <Button 
                variant="outline" 
                className="btn-outline"
                asChild
              >
                <a href="#contact">Connect</a>
              </Button>
            </div>
          </div>
          
          <div 
            className={cn(
              "flex justify-center items-center transition-all duration-1000 delay-300",
              isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
            )}
          >
            <div className="relative w-full max-w-[500px] h-[400px] flex items-center justify-center">
              {/* Decorative elements */}
              <div className="absolute top-0 left-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl animate-pulse-soft"></div>
              <div className="absolute bottom-0 right-0 w-64 h-64 bg-secondary/20 rounded-full blur-3xl animate-pulse-soft" style={{ animationDelay: "2s" }}></div>
              
              {/* Cyberpunk Terminal */}
              <CyberpunkTerminal />
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-8 left-0 right-0 flex justify-center animate-bounce">
          <button 
            onClick={scrollToNext}
            className="text-foreground/70 hover:text-foreground transition-colors duration-300"
            aria-label="Scroll down"
          >
            <ArrowDown size={24} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
