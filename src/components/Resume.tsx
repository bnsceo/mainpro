
import { useState } from "react";
import { useInView } from "@/lib/animations";
import { cn } from "@/lib/utils";
import { RESUME_SECTIONS } from "@/lib/constants";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Download, Printer, Moon, Sun } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/components/ui/use-toast";

const Resume = () => {
  const { ref, isInView } = useInView({}, true);
  const [lightMode, setLightMode] = useState(false);
  
  const handlePrint = () => {
    // First, we need to create a printable version
    const printContent = document.getElementById('resume-content');
    
    if (printContent) {
      const printWindow = window.open('', '_blank');
      
      if (printWindow) {
        // Create a simplified version for printing
        printWindow.document.write(`
<html>
<head>
  <title>Anderson Paulino - Resume</title>
  <style>
    body {
      font-family: 'Arial', sans-serif;
      color: #333;
      line-height: 1.6;
      padding: 20px;
      max-width: 800px;
      margin: 0 auto;
    }
    h1, h2, h3 {
      color: #444;
    }
    h1 {
      font-size: 24px;
      border-bottom: 2px solid #7B68EE;
      padding-bottom: 10px;
      margin-bottom: 20px;
    }
    h2 {
      font-size: 18px;
      margin-top: 20px;
      border-bottom: 1px solid #ddd;
      padding-bottom: 5px;
    }
    h3 {
      font-size: 16px;
      margin: 15px 0 5px;
    }
    ul {
      margin: 5px 0;
    }
    .section {
      margin-bottom: 25px;
    }
    .badge {
      display: inline-block;
      background: #f0f0f0;
      border-radius: 15px;
      padding: 3px 10px;
      margin: 3px;
      font-size: 12px;
    }
    .header {
      text-align: center;
      margin-bottom: 30px;
    }
    @media print {
      body {
        padding: 0;
      }
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>Anderson Paulino</h1>
    <p>Full Stack Developer & Data Analyst</p>
    <p>contact@digitalalchemist.com | linkedin.com/in/andersonpaulino</p>
  </div>
  
  <div class="section">
    <h2>Professional Summary</h2>
    <p>Experienced professional with a strong background in security management, customer service, and team leadership. Skilled in digital marketing, web development, and data analysis with a focus on creating meaningful insights and user experiences.</p>
    <p>Committed to continuous learning and skill development with certifications in cybersecurity, business intelligence, and data analytics. Bilingual in English and Spanish with proven ability to manage teams effectively and deliver exceptional service in high-profile environments.</p>
  </div>
  
  <div class="section">
    <h2>Experience</h2>
    <div class="experience-item">
      <h3>Shift Supervisor | Allied Universal</h3>
      <p><strong>March 2020 - May 2024</strong></p>
      <p>Managed security operations in high-profile environments, ensuring safety and excellent customer service.</p>
    </div>
    <div class="experience-item">
      <h3>Driver | Uber</h3>
      <p><strong>2024 – Present</strong></p>
      <p>Provided professional transportation services, ensuring customer satisfaction and safety.</p>
    </div>
  </div>
  
  <div class="section">
    <h2>Skills</h2>
    <div>
      <span class="badge">Web Development</span>
      <span class="badge">Data Analysis</span>
      <span class="badge">Digital Marketing</span>
      <span class="badge">Security Operations</span>
      <span class="badge">Customer Service</span>
    </div>
  </div>
  
  <div class="section">
    <h2>Certifications</h2>
    <div class="cert-item">
      <h3>Digital Marketing & E-commerce</h3>
    </div>
    <div class="cert-item">
      <h3>Business Intelligence</h3>
    </div>
    <div class="cert-item">
      <h3>Data Analytics</h3>
    </div>
    <div class="cert-item">
      <h3>Cybersecurity with Python</h3>
    </div>
  </div>
  
  <div class="section">
    <h2>Languages</h2>
    <div>
      <span class="badge">English (Fluent)</span>
      <span class="badge">Spanish (Fluent)</span>
    </div>
  </div>
  
  <div class="section">
    <h2>Awards & Recognition</h2>
    <ul>
      <li>Allied Universal - Employer of the Year (2021)</li>
    </ul>
  </div>
</body>
</html>

        `);
        
        printWindow.document.close();
        printWindow.focus();
        
        // Trigger print after content is loaded
        setTimeout(() => {
          printWindow.print();
        }, 500);
      }
    }
    
    toast({
      title: "Print Dialog Opened",
      description: "Resume is ready to print!"
    });
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

  const toggleLightMode = () => {
    setLightMode(!lightMode);
  };

  return (
    <section
      id="resume"
      ref={ref as React.RefObject<HTMLDivElement>}
      className={cn(
        "py-24 relative overflow-hidden transition-colors duration-300",
        lightMode ? "bg-slate-50 text-slate-900" : "bg-background"
      )}
    >
      <div className="container mx-auto px-4 relative z-10">
        <h2 className={cn(
          "section-title mx-auto text-center transition-all duration-700",
          isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12",
          lightMode ? "text-slate-900 after:bg-gradient-to-r after:from-indigo-400 after:to-blue-400" : ""
        )}>
          The Blueprint
        </h2>

        <div className={cn(
          "flex justify-end mb-6 transition-all duration-700 delay-200 gap-2",
          isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
        )}>
          <Button 
            variant="outline" 
            size="sm"
            onClick={toggleLightMode}
            className={lightMode ? "bg-white border-slate-200 text-slate-800" : ""}
            title={lightMode ? "Switch to dark mode" : "Switch to light mode"}
          >
            {lightMode ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className={cn(
              "mr-2",
              lightMode ? "bg-white border-slate-200 text-slate-800" : ""
            )}
            onClick={handleDownload}
          >
            <Download className="h-4 w-4 mr-2" /> Download
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            className={lightMode ? "bg-white border-slate-200 text-slate-800" : ""}
            onClick={handlePrint}
          >
            <Printer className="h-4 w-4 mr-2" /> Print
          </Button>
        </div>

        <div id="resume-content" className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className={cn(
            "lg:col-span-4 transition-all duration-700 delay-300",
            isInView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"
          )}>
            <div className={cn(
              "glass-card p-6", 
              lightMode 
                ? "bg-white/90 backdrop-blur-lg border border-slate-200 shadow-xl" 
                : ""
            )}>
              <Tabs defaultValue="experience" className="w-full">
                <TabsList className={cn(
                  "grid grid-cols-2 mb-6",
                  lightMode ? "bg-slate-100" : ""
                )}>
                  <TabsTrigger 
                    value="experience"
                    className={lightMode ? "data-[state=active]:bg-white data-[state=active]:text-indigo-600" : ""}
                  >Experience</TabsTrigger>
                  <TabsTrigger 
                    value="education"
                    className={lightMode ? "data-[state=active]:bg-white data-[state=active]:text-indigo-600" : ""}
                  >Education</TabsTrigger>
                </TabsList>
                
                <TabsContent value="experience" className="space-y-6">
                  {RESUME_SECTIONS.experience.map((item, index) => (
                    <div 
                      key={index} 
                      className={cn(
                        "relative pl-6 border-l-2 py-1",
                        lightMode ? "border-indigo-400/50 text-slate-800" : "border-primary/50"
                      )}
                    >
                      <div className={cn(
                        "absolute top-0 left-[-9px] w-4 h-4 rounded-full",
                        lightMode ? "bg-indigo-400" : "bg-primary"
                      )}></div>
                      <h3 className="text-lg font-bold">{item.title}</h3>
                      <p className={cn(
                        "mb-1",
                        lightMode ? "text-blue-600" : "text-secondary"
                      )}>{item.organization}</p>
                      <p className={cn(
                        "text-sm mb-2",
                        lightMode ? "text-slate-500" : "text-foreground/70"
                      )}>{item.period}</p>
                      <p className={lightMode ? "text-slate-700" : "text-foreground/80"}>{item.description}</p>
                    </div>
                  ))}
                </TabsContent>
                
                <TabsContent value="education" className="space-y-6">
                  {RESUME_SECTIONS.education.map((item, index) => (
                    <div 
                      key={index} 
                      className={cn(
                        "relative pl-6 border-l-2 py-1",
                        lightMode ? "border-indigo-400/50 text-slate-800" : "border-primary/50"
                      )}
                    >
                      <div className={cn(
                        "absolute top-0 left-[-9px] w-4 h-4 rounded-full",
                        lightMode ? "bg-indigo-400" : "bg-primary"
                      )}></div>
                      <h3 className="text-lg font-bold">{item.title}</h3>
                      <p className={cn(
                        "mb-1",
                        lightMode ? "text-blue-600" : "text-secondary"
                      )}>{item.organization}</p>
                      <p className={cn(
                        "text-sm mb-2",
                        lightMode ? "text-slate-500" : "text-foreground/70"
                      )}>{item.period}</p>
                      <p className={lightMode ? "text-slate-700" : "text-foreground/80"}>{item.description}</p>
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
            <div className={cn(
              "glass-card p-6 lg:p-8", 
              lightMode 
                ? "bg-white/90 backdrop-blur-lg border border-slate-200 shadow-xl" 
                : ""
            )}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className={cn(
                    "text-xl font-bold mb-6 pb-2 border-b",
                    lightMode ? "border-indigo-200 text-slate-800" : "border-primary/30"
                  )}>Technical Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {RESUME_SECTIONS.skills.map((skill, index) => (
                      <Badge 
                        key={index} 
                        className={cn(
                          "mb-2",
                          lightMode 
                            ? "bg-indigo-100 hover:bg-indigo-200 text-indigo-800" 
                            : "bg-primary/20 hover:bg-primary/30 text-foreground"
                        )}
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className={cn(
                    "text-xl font-bold mb-6 pb-2 border-b",
                    lightMode ? "border-indigo-200 text-slate-800" : "border-primary/30"
                  )}>Certifications</h3>
                  <div className="space-y-4">
                    {RESUME_SECTIONS.certifications.map((cert, index) => (
                      <div 
                        key={index} 
                        className={cn(
                          "p-4 rounded-lg",
                          lightMode ? "bg-slate-100" : "bg-muted/30"
                        )}
                      >
                        <h4 className="font-bold">{cert.title}</h4>
                        <p className={cn(
                          "text-sm",
                          lightMode ? "text-slate-500" : "text-foreground/70"
                        )}>
                          {cert.organization} | {cert.year}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className={cn(
                    "text-xl font-bold mb-6 pb-2 border-b",
                    lightMode ? "border-indigo-200 text-slate-800" : "border-primary/30"
                  )}>Languages</h3>
                  <div className="flex flex-wrap gap-2">
                    {RESUME_SECTIONS.languages.map((language, index) => (
                      <Badge 
                        key={index} 
                        variant="outline"
                        className={cn(
                          "mb-2",
                          lightMode 
                            ? "bg-blue-50 hover:bg-blue-100 text-blue-800 border-blue-200" 
                            : "bg-secondary/10 hover:bg-secondary/20 text-foreground"
                        )}
                      >
                        {language}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className={cn(
                    "text-xl font-bold mb-6 pb-2 border-b",
                    lightMode ? "border-indigo-200 text-slate-800" : "border-primary/30"
                  )}>Awards & Recognition</h3>
                  <div className="space-y-4">
                    {RESUME_SECTIONS.awards.map((award, index) => (
                      <div 
                        key={index} 
                        className={cn(
                          "p-4 rounded-lg",
                          lightMode ? "bg-slate-100" : "bg-muted/30"
                        )}
                      >
                        <p className={lightMode ? "text-slate-700" : "text-foreground/80"}>{award}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <h3 className={cn(
                  "text-xl font-bold mb-6 pb-2 border-b",
                  lightMode ? "border-indigo-200 text-slate-800" : "border-primary/30"
                )}>Professional Summary</h3>
                <p className={cn(
                  "mb-4",
                  lightMode ? "text-slate-700" : "text-foreground/80"
                )}>
                  Experienced professional with a strong background in security management, customer service, and team leadership. Skilled in digital marketing, web development, and data analysis with a focus on creating meaningful insights and user experiences.
                </p>
                <p className={lightMode ? "text-slate-700" : "text-foreground/80"}>
                  Committed to continuous learning and skill development with certifications in cybersecurity, business intelligence, and data analytics. Bilingual in English and Spanish with proven ability to manage teams effectively and deliver exceptional service in high-profile environments.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Decorative background elements */}
      <div className={cn(
        "absolute top-30 left-10 w-72 h-72 rounded-full blur-3xl",
        lightMode ? "bg-indigo-100" : "bg-primary/10"
      )}></div>
      <div className={cn(
        "absolute bottom-30 right-10 w-72 h-72 rounded-full blur-3xl",
        lightMode ? "bg-blue-100" : "bg-secondary/10"
      )}></div>
    </section>
  );
};

export default Resume;
