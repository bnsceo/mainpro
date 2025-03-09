
import { useInView } from "@/lib/animations";
import { cn } from "@/lib/utils";
import { SOCIAL_LINKS } from "@/lib/constants";
import { Github, Linkedin, Twitter, Dribbble } from "lucide-react";

const Footer = () => {
  const { ref, isInView } = useInView({}, true);
  
  const getSocialIcon = (icon: string) => {
    switch (icon) {
      case "github":
        return <Github className="h-5 w-5" />;
      case "linkedin":
        return <Linkedin className="h-5 w-5" />;
      case "twitter":
        return <Twitter className="h-5 w-5" />;
      case "dribbble":
        return <Dribbble className="h-5 w-5" />;
      default:
        return null;
    }
  };
  
  return (
    <footer
      ref={ref as React.RefObject<HTMLDivElement>}
      className="py-12 bg-background/95 backdrop-blur-lg relative z-10"
    >
      <div className="container mx-auto px-4">
        <div className={cn(
          "text-center transition-all duration-700",
          isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
        )}>
          <h2 className="text-2xl font-bold mb-6">
            Digital <span className="highlight">Alchemist</span>
          </h2>
          
          <div className="flex justify-center mb-8">
            {SOCIAL_LINKS.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                aria-label={link.platform}
              >
                {getSocialIcon(link.icon)}
              </a>
            ))}
          </div>
          
          <div className="max-w-xl mx-auto mb-8">
            <p className="text-foreground/70 mb-4">
              Transforming ideas into interactive experiences with precision and creativity.
            </p>
            <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 text-sm text-foreground/60">
              <a href="#hero" className="hover:text-foreground transition-colors duration-300">Home</a>
              <a href="#about" className="hover:text-foreground transition-colors duration-300">About</a>
              <a href="#portfolio" className="hover:text-foreground transition-colors duration-300">Portfolio</a>
              <a href="#resume" className="hover:text-foreground transition-colors duration-300">Resume</a>
              <a href="#contact" className="hover:text-foreground transition-colors duration-300">Contact</a>
            </div>
          </div>
          
          <div className="text-sm text-foreground/50">
            &copy; {new Date().getFullYear()} Digital Alchemist. All rights reserved.
          </div>
        </div>
      </div>
      
      {/* Back to top button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={cn(
          "fixed bottom-6 right-6 bg-primary hover:bg-primary/90 text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 z-50",
          isInView ? "opacity-100 scale-100" : "opacity-0 scale-90"
        )}
        aria-label="Back to top"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="18 15 12 9 6 15"></polyline>
        </svg>
      </button>
    </footer>
  );
};

export default Footer;
