import { CheckCircle, Code, Globe, Layers } from "lucide-react";

export const NAV_LINKS = [
  { label: "Crucible", href: "#hero" },
  { label: "Laboratory", href: "#about" },
  { label: "Transformation", href: "#portfolio" },
  { label: "Blueprint", href: "#resume" },
  { label: "Connection", href: "#contact" },
];

export const TIMELINE_DATA = [
  { year: 2020, event: "Started learning web development" },
  { year: 2021, event: "First freelance project completed" },
  { year: 2022, event: "Started contributing to open source" },
  { year: 2023, event: "Launched personal portfolio" },
  { year: 2024, event: "Advanced front-end development" },
];

export const SKILLS_DATA = [
  { skill: "HTML", value: 90 },
  { skill: "CSS", value: 85 },
  { skill: "JavaScript", value: 80 },
  { skill: "React", value: 75 },
  { skill: "TypeScript", value: 70 },
  { skill: "UI Design", value: 65 },
];

export const DATA_STREAM = [
  "Commit: Refactored navigation component",
  "Issue: Resolved responsive layout bug",
  "Update: Added new project to portfolio",
  "Deploy: Production build successful",
  "Merge: Integrated feature branch into main",
  "Release: Version 2.0 launched",
  "Optimization: Improved performance metrics",
];

export const PORTFOLIO_PROJECTS = [
  {
    id: 1,
    title: "Interactive Dashboard",
    category: "Web Development",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1050&q=80",
    description: "A dynamic dashboard with real-time data visualization for business analytics. Built with React and D3.js.",
    technologies: ["React", "D3.js", "CSS Grid", "REST API"],
    link: "#",
    filter: "web",
  },
  {
    id: 2,
    title: "3D Product Showcase",
    category: "Interactive Design",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1050&q=80",
    description: "An immersive 3D showcase for product exploration with smooth animations and interactions.",
    technologies: ["Three.js", "GSAP", "WebGL", "JavaScript"],
    link: "#",
    filter: "interactive",
  },
  {
    id: 3,
    title: "Animated Landing Page",
    category: "Animation",
    image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1050&q=80",
    description: "A visually engaging landing page with smooth scroll animations and interactive elements.",
    technologies: ["HTML", "CSS", "JavaScript", "GSAP"],
    link: "#",
    filter: "animation",
  },
  {
    id: 4,
    title: "E-commerce Platform",
    category: "Web Development",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1050&q=80",
    description: "A fully responsive e-commerce platform with user-friendly interface and payment integration.",
    technologies: ["React", "Node.js", "MongoDB", "Stripe API"],
    link: "#",
    filter: "web",
  },
  {
    id: 5,
    title: "Data Visualization Tool",
    category: "Data Visualization",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1050&q=80",
    description: "A tool for creating and exploring complex data visualizations with interactive elements.",
    technologies: ["D3.js", "SVG", "TypeScript", "REST API"],
    link: "#",
    filter: "data",
  },
  {
    id: 6,
    title: "Mobile App UI Kit",
    category: "UI Design",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1050&q=80",
    description: "A comprehensive UI kit for mobile applications with over 100 components.",
    technologies: ["Figma", "Sketch", "Adobe XD"],
    link: "#",
    filter: "design",
  },
];

export const FILTER_CATEGORIES = [
  { label: "All", value: "all" },
  { label: "Web Development", value: "web" },
  { label: "Interactive Design", value: "interactive" },
  { label: "Animation", value: "animation" },
  { label: "Data Visualization", value: "data" },
  { label: "UI Design", value: "design" },
];

export const RESUME_SECTIONS = {
  education: [
    {
      title: "CUNY Bronx Community College",
      organization: "Bronx, NY",
      period: "2013 - Continuing Education",
      description: "Strong problem-solving skills, developed through business case studies and analytical coursework, enabling effective resolution of customer issues and store operational challenges."
    }
  ],
  experience: [
    {
      title: "Shift Supervisor",
      organization: "Allied Universal",
      period: "March 2020 - May 2024",
      description: "Provided exceptional customer service at a high-profile financial institution and luxury mall. Managed a team of security personnel, providing training and guidance on best practices. Maintained safe environment and handled cash transactions and inventory management."
    }
  ],
  skills: [
    "Cybersecurity Awareness", "Analytical Skills", "Writing Skills", "Teamwork", 
    "Team Management", "Reporting", "Front-End Web Development", "HTML", "CSS",
    "JavaScript", "React Native", "Responsive Web Design", "Digital Marketing Strategy",
    "Data Analysis", "Business Intelligence", "Data Visualization", "Statistical Analysis", 
    "Dashboard Development"
  ],
  certifications: [
    {
      title: "Digital Marketing & E-commerce",
      organization: "Google",
      year: "2023",
    },
    {
      title: "Business Intelligence",
      organization: "Google",
      year: "2023",
    },
    {
      title: "Data Analytics",
      organization: "Google",
      year: "2022",
    },
    {
      title: "Cybersecurity with Python",
      organization: "Coursera",
      year: "2022",
    }
  ],
  languages: ["English", "Spanish"],
  awards: ["Employer of the year (2021)"]
};

export const SERVICES = [
  {
    title: "Web Development",
    description: "Creating responsive and accessible websites with modern technologies",
    icon: Globe,
  },
  {
    title: "Front-end Engineering",
    description: "Building complex interactive applications with React and TypeScript",
    icon: Code,
  },
  {
    title: "UI/UX Design",
    description: "Designing intuitive and visually appealing user interfaces",
    icon: Layers,
  },
  {
    title: "Performance Optimization",
    description: "Improving website speed and user experience through optimization",
    icon: CheckCircle,
  },
];

export const SOCIAL_LINKS = [
  { platform: "GitHub", url: "#", icon: "github" },
  { platform: "LinkedIn", url: "#", icon: "linkedin" },
  { platform: "Twitter", url: "#", icon: "twitter" },
  { platform: "Dribbble", url: "#", icon: "dribbble" },
];
