
import { useRef, useEffect } from "react";
import { useParticleCanvas, useStickFigureAnimation } from "@/lib/animations";
import { cn } from "@/lib/utils";
import { useInView } from "@/lib/animations";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowDown } from "lucide-react";

const Hero = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stickFigureCanvasRef = useRef<HTMLCanvasElement>(null);
  const { ref, isInView } = useInView({}, true);
  
  // Initialize particle animation
  useParticleCanvas(canvasRef, 'rgb(255, 255, 255)', 80);
  
  // Improved Stick Figure Animation with multiple animations and controls
const useStickFigureAnimation = (canvasRef) => {
  const canvas = canvasRef.current;
  const ctx = canvas?.getContext('2d');
  let animationFrameId;
  let isAnimating = true;
  
  // Animation settings
  const settings = {
    speed: 1,
    scale: 1,
    color: '#000000',
    backgroundColor: 'transparent',
    currentAnimation: 'walking' // Default animation
  };
  
  // Multiple animation types
  const animations = {
    walking: (timestamp) => {
      const progress = timestamp * 0.002 * settings.speed;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      if (settings.backgroundColor !== 'transparent') {
        ctx.fillStyle = settings.backgroundColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
      
      ctx.save();
      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.scale(settings.scale, settings.scale);
      
      // Stick figure drawing
      ctx.strokeStyle = settings.color;
      ctx.lineWidth = 2;
      ctx.lineCap = 'round';
      
      // Head
      ctx.beginPath();
      ctx.arc(0, -40, 10, 0, Math.PI * 2);
      ctx.stroke();
      
      // Body
      ctx.beginPath();
      ctx.moveTo(0, -30);
      ctx.lineTo(0, 10);
      ctx.stroke();
      
      // Arms with swinging motion
      const armSwing = Math.sin(progress * Math.PI);
      
      ctx.beginPath();
      ctx.moveTo(0, -20);
      ctx.lineTo(15 * armSwing, 0);
      ctx.stroke();
      
      ctx.beginPath();
      ctx.moveTo(0, -20);
      ctx.lineTo(-15 * armSwing, 0);
      ctx.stroke();
      
      // Legs with walking motion
      const legSwing = Math.sin(progress * Math.PI);
      
      ctx.beginPath();
      ctx.moveTo(0, 10);
      ctx.lineTo(10 * legSwing, 30);
      ctx.stroke();
      
      ctx.beginPath();
      ctx.moveTo(0, 10);
      ctx.lineTo(-10 * legSwing, 30);
      ctx.stroke();
      
      ctx.restore();
    },
    
    jumping: (timestamp) => {
      const progress = timestamp * 0.001 * settings.speed;
      const jumpHeight = Math.abs(Math.sin(progress * Math.PI)) * 20;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      if (settings.backgroundColor !== 'transparent') {
        ctx.fillStyle = settings.backgroundColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
      
      ctx.save();
      ctx.translate(canvas.width / 2, canvas.height / 2 - jumpHeight);
      ctx.scale(settings.scale, settings.scale);
      
      // Stick figure drawing
      ctx.strokeStyle = settings.color;
      ctx.lineWidth = 2;
      ctx.lineCap = 'round';
      
      // Head
      ctx.beginPath();
      ctx.arc(0, -40, 10, 0, Math.PI * 2);
      ctx.stroke();
      
      // Body
      ctx.beginPath();
      ctx.moveTo(0, -30);
      ctx.lineTo(0, 10);
      ctx.stroke();
      
      // Arms raised up for jumping
      const armAngle = Math.PI / 4 + (Math.sin(progress * Math.PI * 2) * Math.PI / 8);
      
      ctx.beginPath();
      ctx.moveTo(0, -20);
      ctx.lineTo(Math.cos(armAngle) * 15, Math.sin(armAngle) * 15 - 20);
      ctx.stroke();
      
      ctx.beginPath();
      ctx.moveTo(0, -20);
      ctx.lineTo(Math.cos(Math.PI - armAngle) * 15, Math.sin(Math.PI - armAngle) * 15 - 20);
      ctx.stroke();
      
      // Legs bent for jumping
      const legBend = Math.sin(progress * Math.PI) * 0.2;
      
      ctx.beginPath();
      ctx.moveTo(0, 10);
      ctx.lineTo(10, 20 - legBend * 10);
      ctx.stroke();
      
      ctx.beginPath();
      ctx.moveTo(0, 10);
      ctx.lineTo(-10, 20 - legBend * 10);
      ctx.stroke();
      
      ctx.restore();
    },
    
    dancing: (timestamp) => {
      const progress = timestamp * 0.002 * settings.speed;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      if (settings.backgroundColor !== 'transparent') {
        ctx.fillStyle = settings.backgroundColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
      
      ctx.save();
      ctx.translate(canvas.width / 2 + Math.sin(progress * 2) * 10, canvas.height / 2 + Math.sin(progress * 4) * 5);
      ctx.scale(settings.scale, settings.scale);
      ctx.rotate(Math.sin(progress) * 0.1);
      
      // Stick figure drawing
      ctx.strokeStyle = settings.color;
      ctx.lineWidth = 2;
      ctx.lineCap = 'round';
      
      // Head with bobbing
      ctx.beginPath();
      ctx.arc(0, -40 + Math.sin(progress * 3) * 2, 10, 0, Math.PI * 2);
      ctx.stroke();
      
      // Body with slight twist
      ctx.beginPath();
      ctx.moveTo(0, -30);
      ctx.lineTo(Math.sin(progress * 2) * 3, 10);
      ctx.stroke();
      
      // Arms with dancing motion
      const leftArmAngle = Math.PI / 4 + Math.sin(progress * 3) * Math.PI / 3;
      const rightArmAngle = Math.PI * 3/4 + Math.sin(progress * 3 + Math.PI) * Math.PI / 3;
      
      ctx.beginPath();
      ctx.moveTo(0, -20);
      ctx.lineTo(Math.cos(leftArmAngle) * 20, Math.sin(leftArmAngle) * 20 - 15);
      ctx.stroke();
      
      ctx.beginPath();
      ctx.moveTo(0, -20);
      ctx.lineTo(Math.cos(rightArmAngle) * 20, Math.sin(rightArmAngle) * 20 - 15);
      ctx.stroke();
      
      // Legs with dancing motion
      const leftLegAngle = Math.PI / 2 + Math.sin(progress * 3) * 0.3;
      const rightLegAngle = Math.PI / 2 + Math.sin(progress * 3 + Math.PI) * 0.3;
      
      ctx.beginPath();
      ctx.moveTo(0, 10);
      ctx.lineTo(Math.cos(leftLegAngle) * 20, Math.sin(leftLegAngle) * 20 + 10);
      ctx.stroke();
      
      ctx.beginPath();
      ctx.moveTo(0, 10);
      ctx.lineTo(Math.cos(rightLegAngle) * 20, Math.sin(rightLegAngle) * 20 + 10);
      ctx.stroke();
      
      ctx.restore();
    }
  };
  
  // Animation loop
  const animate = (timestamp) => {
    if (!canvas || !ctx || !isAnimating) return;
    
    // Run the current animation
    if (animations[settings.currentAnimation]) {
      animations[settings.currentAnimation](timestamp);
    }
    
    animationFrameId = requestAnimationFrame(animate);
  };
  
  // Start animation
  const startAnimation = () => {
    if (!isAnimating) {
      isAnimating = true;
      animationFrameId = requestAnimationFrame(animate);
    }
  };
  
  // Stop animation
  const stopAnimation = () => {
    isAnimating = false;
    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId);
    }
  };
  
  // Change animation type
  const setAnimation = (animationType) => {
    if (animations[animationType]) {
      settings.currentAnimation = animationType;
    }
  };
  
  // Update animation settings
  const updateSettings = (newSettings) => {
    Object.assign(settings, newSettings);
  };
  
  // Initialize animation
  const init = () => {
    if (canvas && ctx) {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      startAnimation();
      
      // Handle window resize
      const handleResize = () => {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
      };
      
      window.addEventListener('resize', handleResize);
      
      // Cleanup function
      return () => {
        stopAnimation();
        window.removeEventListener('resize', handleResize);
      };
    }
  };
  
  return {
    init,
    startAnimation,
    stopAnimation,
    setAnimation,
    updateSettings
  };
};

// Usage example
const AnimatedStickFigure = () => {
  const stickFigureCanvasRef = useRef(null);
  const [animationType, setAnimationType] = useState('walking');
  const [settings, setSettings] = useState({
    speed: 1,
    scale: 1,
    color: '#000000'
  });
  
  useEffect(() => {
    const animation = useStickFigureAnimation(stickFigureCanvasRef);
    const cleanup = animation.init();
    
    // Initialize controls
    animation.setAnimation(animationType);
    animation.updateSettings(settings);
    
    return cleanup;
  }, []);
  
  useEffect(() => {
    const animation = useStickFigureAnimation(stickFigureCanvasRef);
    animation.setAnimation(animationType);
  }, [animationType]);
  
  useEffect(() => {
    const animation = useStickFigureAnimation(stickFigureCanvasRef);
    animation.updateSettings(settings);
  }, [settings]);
  
  const handleSpeedChange = (e) => {
    setSettings(prev => ({ ...prev, speed: parseFloat(e.target.value) }));
  };
  
  const handleScaleChange = (e) => {
    setSettings(prev => ({ ...prev, scale: parseFloat(e.target.value) }));
  };
  
  const handleColorChange = (e) => {
    setSettings(prev => ({ ...prev, color: e.target.value }));
  };
  
  const scrollToNext = () => {
    const aboutSection = document.getElementById("about");
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" });
    }
  };
  
  return (
    <div className="animation-container">
      <canvas 
        ref={stickFigureCanvasRef} 
        className="w-full h-64 border border-gray-300 rounded"
      />
      
      <div className="controls mt-4">
        <div className="mb-2">
          <label className="mr-2">Animation:</label>
          <select 
            value={animationType} 
            onChange={(e) => setAnimationType(e.target.value)}
            className="px-2 py-1 border border-gray-300 rounded"
          >
            <option value="walking">Walking</option>
            <option value="jumping">Jumping</option>
            <option value="dancing">Dancing</option>
          </select>
        </div>
        
        <div className="mb-2">
          <label className="mr-2">Speed:</label>
          <input 
            type="range" 
            min="0.5" 
            max="3" 
            step="0.1" 
            value={settings.speed} 
            onChange={handleSpeedChange} 
            className="w-32"
          />
          <span className="ml-2">{settings.speed.toFixed(1)}x</span>
        </div>
        
        <div className="mb-2">
          <label className="mr-2">Scale:</label>
          <input 
            type="range" 
            min="0.5" 
            max="2" 
            step="0.1" 
            value={settings.scale} 
            onChange={handleScaleChange} 
            className="w-32"
          />
          <span className="ml-2">{settings.scale.toFixed(1)}x</span>
        </div>
        
        <div className="mb-2">
          <label className="mr-2">Color:</label>
          <input 
            type="color" 
            value={settings.color} 
            onChange={handleColorChange} 
            className="align-middle"
          />
        </div>
      </div>
      
      <button 
        onClick={scrollToNext}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Continue to About
      </button>
    </div>
  );
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
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
              Digital <span className="highlight">Alchemist</span>
            </h1>
            
            <div className="relative h-20">
              <canvas 
                ref={stickFigureCanvasRef} 
                className="w-full h-full"
              />
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
              "hidden lg:flex justify-center items-center transition-all duration-1000 delay-300",
              isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
            )}
          >
            <div className="relative w-full h-[400px] max-w-[500px]">
              {/* Decorative elements */}
              <div className="absolute top-0 left-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl animate-pulse-soft"></div>
              <div className="absolute bottom-0 right-0 w-64 h-64 bg-secondary/20 rounded-full blur-3xl animate-pulse-soft" style={{ animationDelay: "2s" }}></div>
              
              {/* Could be replaced with a 3D model or illustration */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative glass-card w-80 h-80 rounded-2xl overflow-hidden shadow-2xl">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-secondary/30"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-4xl font-bold">DA</div>
                  </div>
                </div>
              </div>
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
