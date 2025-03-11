
import { useRef } from "react";
import { useInView, useInteractiveParticles } from "@/lib/animations";
import { cn } from "@/lib/utils";
import { TIMELINE_DATA, SKILLS_DATA, SERVICES } from "@/lib/constants";
import { Progress } from "@/components/ui/progress";

const About = () => {
  const { ref, isInView } = useInView({}, true);
  const interactiveCanvasRef = useRef<HTMLCanvasElement>(null);
  
  // Call the hook at component level, passing isInView to activate/deactivate
  useInteractiveParticles(interactiveCanvasRef, isInView);

  return (
    <section
      id="about"
      ref={ref as React.RefObject<HTMLDivElement>}
      className="py-24 bg-background relative overflow-hidden"
    >
      <div className="container mx-auto px-4 relative z-10">
        <h2 className={cn(
          "section-title mx-auto text-center transition-all duration-700",
          isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
        )}>
          The Laboratory
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-16">
          <div className={cn(
            "transition-all duration-700 delay-200",
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          )}>
            <div className="glass-card p-8 h-full">
              <h3 className="text-2xl font-bold mb-6">The Alchemist's Journey</h3>
              <p className="mb-4 text-foreground/80">
                As a digital alchemist, I transform raw code into immersive experiences. With expertise in front-end development, I blend visual design with technical precision to create digital solutions that engage and inspire.
              </p>
              <p className="text-foreground/80">
                My process combines careful planning with creative experimentation, resulting in work that balances form and function. I'm constantly exploring new technologies and techniques to elevate my craft.
              </p>
              
              <h3 className="text-2xl font-bold mt-10 mb-6">Services</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {SERVICES.map((service, index) => (
                  <div key={index} className="flex flex-col bg-muted/30 rounded-lg p-5 transition-transform duration-300 hover:-translate-y-1">
                    <service.icon className="h-8 w-8 mb-3 text-secondary" />
                    <h4 className="font-semibold mb-2">{service.title}</h4>
                    <p className="text-sm text-foreground/70">{service.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className={cn(
            "transition-all duration-700 delay-300",
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          )}>
            <div className="glass-card p-8 h-full">
              <h3 className="text-2xl font-bold mb-6">Skills</h3>
              
              <div className="space-y-5">
                {SKILLS_DATA.map((skill, index) => (
                  <div key={index}>
                    <div className="flex justify-between mb-2">
                      <span className="font-medium">{skill.skill}</span>
                      <span>{skill.value}%</span>
                    </div>
                    <Progress 
                      value={skill.value} 
                      className="h-2 bg-muted/50" 
                      indicatorClassName="bg-gradient-to-r from-primary to-secondary" 
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className={cn(
          "mt-16 transition-all duration-700 delay-400",
          isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
        )}>
          <h3 className="text-2xl font-bold mb-6 text-center">Timeline of Transformations</h3>
          <div className="glass-card p-8 overflow-x-auto whitespace-nowrap">
            {TIMELINE_DATA.map((item, index) => (
              <div key={index} className="timeline-item" style={{ animationDelay: `${index * 200}ms` }}>
                <h3 className="text-xl font-bold mb-2">{item.year}</h3>
                <p className="text-foreground/80 whitespace-normal">{item.event}</p>
              </div>
            ))}
          </div>
        </div>

        <div className={cn(
          "mt-16 transition-all duration-700 delay-500",
          isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
        )}>
          <h3 className="text-2xl font-bold mb-6 text-center">Interactive Particle Field</h3>
          <div className="glass-card p-8 min-h-[300px] relative overflow-hidden">
            <canvas 
              ref={interactiveCanvasRef} 
              className="w-full h-[300px]"
            />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none text-center opacity-70">
              <p className="mb-2 text-sm">Move your mouse over the canvas</p>
              <p className="text-xs">The particles respond to your movement</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Decorative background elements */}
      <div className="absolute top-20 left-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-20 w-64 h-64 bg-secondary/10 rounded-full blur-3xl"></div>
    </section>
  );
};

export default About;
