
import { useRef, useEffect } from "react";
import { useInView } from "@/lib/animations";
import { SKILLS_DATA } from "@/lib/constants";

const SkillGraph = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const { ref, isInView } = useInView({}, true);
  
  useEffect(() => {
    if (!svgRef.current || !isInView) return;
    
    const svg = svgRef.current;
    const width = svg.width.baseVal.value;
    const height = svg.height.baseVal.value;
    
    // Clear previous content
    while (svg.firstChild) {
      svg.removeChild(svg.firstChild);
    }
    
    // Create gradient
    const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
    const gradient = document.createElementNS("http://www.w3.org/2000/svg", "linearGradient");
    gradient.setAttribute("id", "skillGradient");
    gradient.setAttribute("x1", "0%");
    gradient.setAttribute("y1", "0%");
    gradient.setAttribute("x2", "0%");
    gradient.setAttribute("y2", "100%");
    
    const stop1 = document.createElementNS("http://www.w3.org/2000/svg", "stop");
    stop1.setAttribute("offset", "0%");
    stop1.setAttribute("stop-color", "#7b68ee");
    
    const stop2 = document.createElementNS("http://www.w3.org/2000/svg", "stop");
    stop2.setAttribute("offset", "100%");
    stop2.setAttribute("stop-color", "#00bfff");
    
    gradient.appendChild(stop1);
    gradient.appendChild(stop2);
    defs.appendChild(gradient);
    svg.appendChild(defs);
    
    // Calculate bar width and spacing
    const barWidth = (width / SKILLS_DATA.length) * 0.6;
    const barSpacing = (width / SKILLS_DATA.length) * 0.4;
    
    // Draw bars
    SKILLS_DATA.forEach((skillData, index) => {
      const barHeight = (skillData.value / 100) * height;
      const barX = index * (barWidth + barSpacing) + barSpacing / 2;
      const barY = height - barHeight;
      
      // Create bar
      const bar = document.createElementNS("http://www.w3.org/2000/svg", "rect");
      bar.setAttribute("x", barX.toString());
      bar.setAttribute("y", height.toString()); // Start at bottom
      bar.setAttribute("width", barWidth.toString());
      bar.setAttribute("height", "0"); // Start with zero height
      bar.setAttribute("fill", "url(#skillGradient)");
      bar.setAttribute("rx", "4");
      svg.appendChild(bar);
      
      // Animate bar
      setTimeout(() => {
        bar.setAttribute("y", barY.toString());
        bar.setAttribute("height", barHeight.toString());
        bar.style.transition = "y 1s ease-out, height 1s ease-out";
      }, index * 150);
      
      // Add skill name
      const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
      text.setAttribute("x", (barX + barWidth / 2).toString());
      text.setAttribute("y", (height + 20).toString());
      text.setAttribute("text-anchor", "middle");
      text.setAttribute("fill", "currentColor");
      text.setAttribute("font-size", "12");
      text.textContent = skillData.skill;
      svg.appendChild(text);
      
      // Add percentage
      const percentage = document.createElementNS("http://www.w3.org/2000/svg", "text");
      percentage.setAttribute("x", (barX + barWidth / 2).toString());
      percentage.setAttribute("y", (barY - 10).toString());
      percentage.setAttribute("text-anchor", "middle");
      percentage.setAttribute("fill", "currentColor");
      percentage.setAttribute("font-size", "12");
      percentage.setAttribute("opacity", "0");
      percentage.textContent = `${skillData.value}%`;
      svg.appendChild(percentage);
      
      // Animate percentage
      setTimeout(() => {
        percentage.setAttribute("opacity", "1");
        percentage.style.transition = "opacity 0.5s ease-out";
      }, index * 150 + 500);
    });
  }, [isInView]);
  
  return (
    <div ref={ref as React.RefObject<HTMLDivElement>} className="w-full h-full">
      <svg ref={svgRef} width="100%" height="300" preserveAspectRatio="none"></svg>
    </div>
  );
};

export default SkillGraph;
