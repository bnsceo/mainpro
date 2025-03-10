import { useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { useInView } from "@/lib/animations";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowDown } from "lucide-react";

// Assuming useParticleCanvas is in "@/lib/animations"
// Replace this with the actual content of your useParticleCanvas hook
export const useParticleCanvas = (canvasRef, particleColor, particleCount) => {
    useEffect(() => {
        let isMounted = true;
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Example particle animation logic (replace with your actual logic)
        const particles = [];
        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                radius: Math.random() * 2,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
            });
        }

        const animate = () => {
            if (!isMounted) return;

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach((particle) => {
                particle.x += particle.vx;
                particle.y += particle.vy;

                if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
                if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
                ctx.fillStyle = particleColor;
                ctx.fill();
            });

            requestAnimationFrame(animate);
        };

        animate();

        const handleResize = () => {
            if (isMounted) {
                canvas.width = canvas.offsetWidth;
                canvas.height = canvas.offsetHeight;
            }
        };

        window.addEventListener('resize', handleResize);

        return () => {
            isMounted = false;
            window.removeEventListener('resize', handleResize);
        };
    }, [canvasRef, particleColor, particleCount]);
};

const Hero = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const { ref, isInView } = useInView({}, true);

    // Initialize particle animation
    useParticleCanvas(canvasRef, 'rgb(255, 255, 255)', 80);

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
                        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                            Digital <span className="highlight">Alchemist</span>
                        </h1>

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
                            <div className="absolute top-0 left-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl animate-pulse-soft"></div>
                            <div className="absolute bottom-0 right-0 w-64 h-64 bg-secondary/20 rounded-full blur-3xl animate-pulse-soft" style={{ animationDelay: "2s" }}></div>

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
