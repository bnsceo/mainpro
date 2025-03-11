
import { useState, useEffect } from "react";
import { useInView } from "@/lib/animations";
import { cn } from "@/lib/utils";
import { PORTFOLIO_PROJECTS, FILTER_CATEGORIES } from "@/lib/constants";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github, Code, Eye } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const Portfolio = () => {
  const { ref, isInView } = useInView({}, true);
  const [filter, setFilter] = useState("all");
  const [selectedProject, setSelectedProject] = useState<null | typeof PORTFOLIO_PROJECTS[0]>(null);
  const [activeTab, setActiveTab] = useState("overview");

  const filteredProjects = PORTFOLIO_PROJECTS.filter(
    (project) => filter === "all" || project.filter === filter
  );

  useEffect(() => {
    // Reset active tab when project changes
    if (selectedProject) {
      setActiveTab("overview");
    }
  }, [selectedProject]);

  return (
    <section
      id="portfolio"
      ref={ref as React.RefObject<HTMLDivElement>}
      className="py-24 bg-muted/20 relative overflow-hidden"
    >
      <div className="container mx-auto px-4 relative z-10">
        <h2 className={cn(
          "section-title mx-auto text-center transition-all duration-700",
          isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
        )}>
          The Transformation
        </h2>

        <div className={cn(
          "flex flex-wrap justify-center gap-3 mb-12 transition-all duration-700 delay-200",
          isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
        )}>
          {FILTER_CATEGORIES.map((category) => (
            <button
              key={category.value}
              className={cn(
                "btn-filter",
                filter === category.value && "active"
              )}
              onClick={() => setFilter(category.value)}
            >
              {category.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <div
              key={project.id}
              className={cn(
                "portfolio-item group transition-all duration-700",
                isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
              )}
              style={{ transitionDelay: `${200 + index * 100}ms` }}
              onClick={() => setSelectedProject(project)}
            >
              <img
                src={project.image}
                alt={project.title}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-500"
              />
              <div className="portfolio-overlay">
                <h3 className="text-xl font-bold text-white mb-1">{project.title}</h3>
                <p className="text-secondary">{project.category}</p>
                <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Button size="sm" variant="secondary" className="bg-background/20 backdrop-blur-sm">
                    View Details
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-12 text-foreground/60">
            No projects found in this category.
          </div>
        )}
      </div>

      {/* Enhanced project details modal with tabs */}
      <Dialog open={!!selectedProject} onOpenChange={(open) => !open && setSelectedProject(null)}>
        <DialogContent className="max-w-4xl bg-background/95 backdrop-blur-lg border-none">
          {selectedProject && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold">{selectedProject.title}</DialogTitle>
                <DialogDescription className="text-foreground/70">
                  {selectedProject.category}
                </DialogDescription>
              </DialogHeader>
              
              <div className="relative rounded-lg overflow-hidden h-60 sm:h-80 mb-6">
                <img 
                  src={selectedProject.image} 
                  alt={selectedProject.title} 
                  className="w-full h-full object-cover"
                />
              </div>
              
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="w-full grid grid-cols-3">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="features">Features</TabsTrigger>
                  <TabsTrigger value="code">Code</TabsTrigger>
                </TabsList>
                
                <TabsContent value="overview" className="space-y-4 mt-4">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Project Description</h3>
                    <p className="text-foreground/80">{selectedProject.description}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Technologies</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.technologies.map((tech, index) => (
                        <Badge key={index} className="bg-primary/20 hover:bg-primary/30 text-foreground">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="features" className="space-y-4 mt-4">
                  <h3 className="text-lg font-semibold mb-2">Key Features</h3>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Responsive design for all device sizes</li>
                    <li>Interactive user interface with modern animations</li>
                    <li>Optimized performance with lazy loading</li>
                    <li>Cross-browser compatibility</li>
                    <li>Accessible according to WCAG guidelines</li>
                  </ul>
                </TabsContent>
                
                <TabsContent value="code" className="mt-4">
                  <div className="rounded-md bg-black/90 p-4 font-mono text-xs sm:text-sm text-green-400 overflow-x-auto">
                    <pre className="whitespace-pre-wrap">
                      {`// Sample code from ${selectedProject.title}
import React, { useState, useEffect } from 'react';

function ${selectedProject.title.replace(/\s+/g, '')}() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Simulate API call
    const fetchData = async () => {
      try {
        // Fetch data from API
        const response = await fetch('/api/data');
        const result = await response.json();
        
        setData(result);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
  return (
    <div className="container">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="data-grid">
          {data.map((item) => (
            <div key={item.id} className="data-card">
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}`}
                    </pre>
                  </div>
                </TabsContent>
              </Tabs>
              
              <div className="flex flex-col sm:flex-row gap-3 mt-6">
                <Button asChild className="flex-1" variant="default">
                  <a href={selectedProject.link} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center">
                    <Eye className="mr-2 h-4 w-4" /> Live Demo
                  </a>
                </Button>
                
                <Button asChild className="flex-1" variant="outline">
                  <a href="#" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center">
                    <Github className="mr-2 h-4 w-4" /> View Repository
                  </a>
                </Button>
                
                <Button asChild className="flex-1" variant="secondary">
                  <a href="#" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center">
                    <Code className="mr-2 h-4 w-4" /> Technical Details
                  </a>
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
      
      {/* Decorative background elements */}
      <div className="absolute top-40 right-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-40 left-20 w-72 h-72 bg-secondary/10 rounded-full blur-3xl"></div>
    </section>
  );
};

export default Portfolio;
