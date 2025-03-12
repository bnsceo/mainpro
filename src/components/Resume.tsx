
import { useState } from "react";
import { useInView } from "@/lib/animations";
import { cn } from "@/lib/utils";
import { RESUME_SECTIONS } from "@/lib/constants";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Download, Printer } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/components/ui/use-toast";

const Resume = () => {
  const { ref, isInView } = useInView({}, true);
  
  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    // Get the base URL for proper path handling in GitHub Pages
    const baseUrl = import.meta.env.MODE === 'production' 
      ? '/interactive-resume-laboratory' 
      : '';
      
    // Create download link to the PDF in the public folder
    const link = document.createElement("a");
    link.href = `${baseUrl}/resume.pdf`;
    link.download = "anderson_paulino_resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast({
      title: "Resume Downloaded",
      description: "Thank you for your interest in my work!"
    });
  };

  return (
    <section
      id="resume"
      ref={ref as React.RefObject<HTMLDivElement>}
      className="py-24 bg-background relative overflow-hidden"
    >
      <div className="container mx-auto px-4 relative z-10">
        <h2 className={cn(
          "section-title mx-auto text-center transition-all duration-700",
          isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
        )}>
          The Blueprint
        </h2>

        <div className={cn(
          "flex justify-end mb-6 transition-all duration-700 delay-200",
          isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
        )}>
          <Button 
            variant="outline" 
            size="sm" 
            className="mr-2"
            onClick={handleDownload}
          >
            <Download className="h-4 w-4 mr-2" /> Download
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={handlePrint}
          >
            <Printer className="h-4 w-4 mr-2" /> Print
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className={cn(
            "lg:col-span-4 transition-all duration-700 delay-300",
            isInView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"
          )}>
            <div className="glass-card p-6">
              <Tabs defaultValue="experience" className="w-full">
                <TabsList className="grid grid-cols-2 mb-6">
                  <TabsTrigger value="experience">Experience</TabsTrigger>
                  <TabsTrigger value="education">Education</TabsTrigger>
                </TabsList>
                
                <TabsContent value="experience" className="space-y-6">
                  {RESUME_SECTIONS.experience.map((item, index) => (
                    <div key={index} className="relative pl-6 border-l-2 border-primary/50 py-1">
                      <div className="absolute top-0 left-[-9px] w-4 h-4 rounded-full bg-primary"></div>
                      <h3 className="text-lg font-bold">{item.title}</h3>
                      <p className="text-secondary mb-1">{item.organization}</p>
                      <p className="text-sm text-foreground/70 mb-2">{item.period}</p>
                      <p className="text-foreground/80">{item.description}</p>
                    </div>
                  ))}
                </TabsContent>
                
                <TabsContent value="education" className="space-y-6">
                  {RESUME_SECTIONS.education.map((item, index) => (
                    <div key={index} className="relative pl-6 border-l-2 border-primary/50 py-1">
                      <div className="absolute top-0 left-[-9px] w-4 h-4 rounded-full bg-primary"></div>
                      <h3 className="text-lg font-bold">{item.title}</h3>
                      <p className="text-secondary mb-1">{item.organization}</p>
                      <p className="text-sm text-foreground/70 mb-2">{item.period}</p>
                      <p className="text-foreground/80">{item.description}</p>
                    </div>
                  ))}
                </TabsContent>
              </Tabs>
            </div>
          </div>

          <div className={cn(
            "lg:col-span-8 transition-all duration-700 delay-400",
            isInView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"
          )}>
            <div className="glass-card p-6 lg:p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold mb-6 pb-2 border-b border-primary/30">Technical Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {RESUME_SECTIONS.skills.map((skill, index) => (
                      <Badge 
                        key={index} 
                        className="bg-primary/20 hover:bg-primary/30 text-foreground mb-2"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-xl font-bold mb-6 pb-2 border-b border-primary/30">Certifications</h3>
                  <div className="space-y-4">
                    {RESUME_SECTIONS.certifications.map((cert, index) => (
                      <div key={index} className="bg-muted/30 p-4 rounded-lg">
                        <h4 className="font-bold">{cert.title}</h4>
                        <p className="text-sm text-foreground/70">
                          {cert.organization} | {cert.year}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold mb-6 pb-2 border-b border-primary/30">Languages</h3>
                  <div className="flex flex-wrap gap-2">
                    {RESUME_SECTIONS.languages.map((language, index) => (
                      <Badge 
                        key={index} 
                        variant="outline"
                        className="bg-secondary/10 hover:bg-secondary/20 text-foreground mb-2"
                      >
                        {language}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-xl font-bold mb-6 pb-2 border-b border-primary/30">Awards & Recognition</h3>
                  <div className="space-y-4">
                    {RESUME_SECTIONS.awards.map((award, index) => (
                      <div key={index} className="bg-muted/30 p-4 rounded-lg">
                        <p className="text-foreground/80">{award}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <h3 className="text-xl font-bold mb-6 pb-2 border-b border-primary/30">Professional Summary</h3>
                <p className="text-foreground/80 mb-4">
                  Experienced professional with a strong background in security management, customer service, and team leadership. Skilled in digital marketing, web development, and data analysis with a focus on creating meaningful insights and user experiences.
                </p>
                <p className="text-foreground/80">
                  Committed to continuous learning and skill development with certifications in cybersecurity, business intelligence, and data analytics. Bilingual in English and Spanish with proven ability to manage teams effectively and deliver exceptional service in high-profile environments.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Decorative background elements */}
      <div className="absolute top-30 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-30 right-10 w-72 h-72 bg-secondary/10 rounded-full blur-3xl"></div>
    </section>
  );
};

export default Resume;
