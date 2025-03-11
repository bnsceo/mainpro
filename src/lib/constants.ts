
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
      title: "Continuing Education",
      organization: "CUNY Bronx Community College, Bronx, NY",
      period: "2013 - Present",
      description: "Strong problem-solving skills developed through business case studies and analytical coursework, enabling effective resolution of customer issues and operational challenges.",
    },
  ],
  experience: [
    {
      title: "Shift Supervisor",
      organization: "Allied Universal, Orlando, FL",
      period: "March 2020 - May 2024",
      description: "Managed a team of security personnel, providing training and guidance on customer service best practices and communication techniques. Maintained a safe and organized environment, contributing to a positive customer experience at a high-profile financial institution and luxury mall. Handled cash transactions and managed inventory of security equipment, ensuring accurate record-keeping and efficient resource allocation.",
    },
  ],
  skills: [
    "Cybersecurity Awareness", "Analytical Skills", "Writing Skills", "Teamwork", "Team Management", "Reporting",
    "Front-End Web Development", "HTML", "CSS", "JavaScript", "React Native", "Responsive Web Design", "Digital Marketing Strategy",
    "Data Analysis & Business Intelligence", "Data Visualization", "Statistical Analysis", "Dashboard Development"
  ],
  certifications: [
    { title: "Digital Marketing & E-commerce", organization: "Google", year: "2024" },
    { title: "Business Intelligence", organization: "Google", year: "2024" },
    { title: "Data Analytics", organization: "Google", year: "2024" },
    { title: "Automate Cybersecurity Tasks with Python", organization: "Google", year: "2024" },
    { title: "Operating Systems: Overview, Administration, and Security", organization: "Google", year: "2024" },
    { title: "Google Digital Marketing & E-commerce", organization: "Google", year: "2024" },
    { title: "Satisfaction Guaranteed: Develop Customer Loyalty Online", organization: "Google", year: "2024" },
    { title: "Google Business Intelligence", organization: "Google", year: "2024" },
    { title: "Decisions, Decisions: Dashboards and Reports", organization: "Google", year: "2024" },
    { title: "Create a Resume and Cover Letter with Google Docs", organization: "Google", year: "2024" },
    { title: "Cybersecurity Case Studies and Capstone Project", organization: "Google", year: "2024" },
    { title: "Hiring Practices", organization: "Google", year: "2024" },
    { title: "Interviewing Best Practices", organization: "Google", year: "2024" },
    { title: "HTML, CSS, and JavaScript for Web Developers", organization: "Google", year: "2024" },
    { title: "Managing Employee Performance", organization: "Google", year: "2024" },
    { title: "Fundamentals of Data Governance", organization: "Edureka", year: "2024" },
    { title: "Google Data Analytics", organization: "Google", year: "2024" },
    { title: "Google Data Analytics Capstone: Complete a Case Study", organization: "Google", year: "2024" },
    { title: "AI For Everyone", organization: "Coursera", year: "2024" },
    { title: "Code Free Data Science", organization: "University of California San Diego", year: "2024" },
    { title: "Getting Started with Microsoft Excel", organization: "Coursera", year: "2024" },
    { title: "Rethink Possibilities", organization: "Coursera", year: "2024" },
  ],
  awards: [
    { title: "Employer of the Year", organization: "Allied Universal", year: "2021" },
  ],
};

export const SERVICES = [
  {
    title: "Cybersecurity Awareness",
    description: "Providing insights on best security practices to safeguard digital assets.",
    icon: Shield,
  },
  {
    title: "Data Analysis & Business Intelligence",
    description: "Leveraging data visualization and statistical analysis for business decision-making.",
    icon: ChartBar,
  },
  {
    title: "Front-End Web Development",
    description: "Developing responsive web applications with modern technologies.",
    icon: Code,
  },
  {
    title: "Digital Marketing Strategy",
    description: "Optimizing online presence through effective marketing techniques.",
    icon: Globe,
  },
];

export const SOCIAL_LINKS = [
  { platform: "GitHub", url: "#", icon: "github" },
  { platform: "LinkedIn", url: "#", icon: "linkedin" },
  { platform: "Twitter", url: "#", icon: "twitter" },
  { platform: "Dribbble", url: "#", icon: "dribbble" },
];
