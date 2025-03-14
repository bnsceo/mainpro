// Anderson Paulino's Terminal Portfolio Interface
// This code powers an interactive terminal-style portfolio
// showcasing Anderson's journey as a Full Stack Developer & Data Analyst

// Define all supported terminal commands
export const SUPPORTED_COMMANDS = [
  { name: 'whoami', description: 'Display user identity' },
  { name: 'skills --list', description: 'Show skill set' },
  { name: 'projects --latest', description: 'View recent projects' },
  { name: 'contact --show', description: 'Display contact information' },
  { name: 'clear', description: 'Clear terminal screen' },
  { name: 'experience', description: 'Show work experience' },
  { name: 'education', description: 'Display educational background' },
  { name: 'achievements', description: 'List notable achievements' },
  { name: 'certificates', description: 'Show professional certificates' },
  { name: 'languages', description: 'List programming languages' },
  { name: 'tools', description: 'Show development tools' },
  { name: 'social --links', description: 'Display social media links' },
  { name: 'quote', description: 'Show a motivational quote' },
  { name: 'help', description: 'List available commands' },
  { name: 'exit', description: 'End terminal session' },
];

// Anderson's journey in tech began with a fascination for coding and data
export const EXPERIENCE = [
  "Shift Supervisor @ Allied Universal (2020-2024)",
  "- Led security teams at financial institutions and luxury malls",
  "- Implemented efficient scheduling systems and reporting processes",
  "- Managed client relationships and resolved high-priority security incidents",
  "",
  "Distribution Manager @ Cityline Distributors (2015-2019)",
  "- Managed logistics and delivery operations",
  "- Compiled analytical reports on distribution metrics",
  "- Processed transactions and resolved customer complaints",
  "- Optimized delivery routes using data analysis techniques"
];

// His continued pursuit of knowledge shaped his path
export const EDUCATION = [
  "Continuing Education @ CUNY Bronx Community College",
  "- Focusing on Computer Science and Data Analytics",
  "- Participating in coding bootcamps and hackathons",
  "- Self-taught in various programming languages and frameworks"
];

// Along the way, he developed a diverse skill set
export const TECHNICAL_SKILLS = [
  "Frontend Development",
  "- React, TypeScript, Tailwind CSS",
  "- Responsive Web Design",
  "- JavaScript, HTML5, CSS3",
  "",
  "Backend Development",
  "- Node.js, Python, SQL",
  "- RESTful API Design",
  "- Database Management",
  "",
  "Data Analysis",
  "- Data Visualization & Dashboard Development",
  "- Statistical Analysis",
  "- Business Intelligence",
  "",
  "Other Skills",
  "- Cybersecurity Awareness",
  "- Team Management",
  "- AI & Automation",
  "- E-commerce Platforms"
];

// His notable achievements demonstrate his capabilities
export const ACHIEVEMENTS = [
  "Led security teams for prestigious financial institutions",
  "Recognized as Employee of the Year (2021)",
  "Developed a retro-styled stock trading game simulation",
  "Created data visualization dashboards for business analytics",
  "Implemented automated reporting systems reducing manual work by 40%"
];

// He continued to expand his knowledge through certifications
export const CERTIFICATES = [
  "Google Data Analytics Professional",
  "Google Digital Marketing & E-commerce",
  "Automate Cybersecurity Tasks with Python",
  "Fundamentals of Data Governance",
  "Cybersecurity Case Studies & Capstone Project",
  "HTML, CSS, and JavaScript for Web Developers"
];

// His projects showcase his practical skills
export const PROJECTS = [
  {
    id: 1,
    name: "🎮 Trade Game (2024)",
    description: "An interactive trading simulation game to maximize profits",
    technologies: "JavaScript, HTML Canvas, CSS, Algorithm Design",
    role: "Game Developer",
    link: "https://anderson-s-projects.github.io/Trade-Game/"
  },
  {
    id: 2,
    name: "📊 Interactive Dashboard (2023)",
    description: "Dynamic dashboard with real-time data visualization for business analytics",
    technologies: "React, D3.js, CSS Grid, REST API",
    role: "Frontend Developer"
  },
  {
    id: 3,
    name: "🚀 3D Product Showcase (2023)",
    description: "Immersive 3D showcase for product exploration with smooth animations",
    technologies: "Three.js, GSAP, WebGL, JavaScript",
    role: "Interactive Developer"
  }
];

// His multilingual abilities enhance his communication skills
export const LANGUAGES = [
  "English (Fluent)",
  "Spanish (Fluent)",
  "Programming Languages:",
  "- JavaScript/TypeScript",
  "- Python",
  "- SQL",
  "- HTML/CSS"
];

// He leverages various tools to bring his ideas to life
export const TOOLS = {
  development: [
    "VS Code",
    "Xcode",
    "Virtual Box"
  ],
  versionControl: [
    "GitHub",
    "GitHub Actions",
    "Jenkins"
  ],
  cloudAndContainerization: [
    "AWS",
    "Azure",
    "Google Cloud Platform (GCP)"
  ],
  designAndProductivity: [
    "Midjourney",
    "Canvas",
    "Figma",
    "Adobe XD",
    "Microsoft Office Suite",
    "Linux"
  ]
};

// His social presence extends his professional network
export const SOCIAL_LINKS = [
  "GitHub: https://github.com/Anderson-s-Projects/",
  "LinkedIn: https://www.linkedin.com/in/82anderson-paulino/",
  "Twitter: @wookyleaks",
  "Website: Wookyleaks.com"
];

// Contact information for professional inquiries
export const CONTACT_INFO = [
  "For any inquiries, please fill out the contact form below.",
  "Email: Available upon request",
  "Phone: Available upon request",
  "LinkedIn: https://www.linkedin.com/in/82anderson-paulino/",
  "Website: Wookyleaks.com"
];

// Technology facts that inspire his work
export const RANDOM_FACTS = [
  "The first computer programmer was a woman named Ada Lovelace, who wrote the first algorithm for Charles Babbage's Analytical Engine in the 1840s.",
  "The term 'bug' in computing originated when Grace Hopper found a moth causing issues in the Harvard Mark II computer in 1947.",
  "JavaScript was created in just 10 days by Brendan Eich in 1995.",
  "The first website went live on August 6, 1991. It was dedicated to information on the World Wide Web project.",
  "Python was named after Monty Python, not the snake.",
  "The first computer virus, 'Elk Cloner,' was created in 1982 as a prank by a 15-year-old.",
  "Cybersecurity threats are constantly evolving, with phishing attacks being one of the most common forms of cybercrime today.",
  "The ENIAC, one of the first general-purpose computers, weighed over 27 tons and took up 1,800 square feet of space.",
  "HTML and CSS are not programming languages; they are markup and styling languages, respectively.",
  "React Native allows developers to build mobile apps using JavaScript, sharing code between iOS and Android platforms."
];

// Quotes that guide his professional philosophy
export const QUOTES = [
  "\"The best way to predict the future is to invent it.\" – Alan Kay",
  "\"Code is like humor. When you have to explain it, it's bad.\" – Cory House",
  "\"Programming isn't about what you know; it's about what you can figure out.\" – Chris Pine",
  "\"Simplicity is the soul of efficiency.\" – Austin Freeman",
  "\"First, solve the problem. Then, write the code.\" – John Johnson",
  "\"Data is the new oil, but just like oil, it must be refined before it can be useful.\" – Clive Humby",
  "\"Security is always excessive until it's not enough.\" – Robbie Sinclair",
  "\"If you automate a mess, you get an automated mess.\" – Rod Michael",
  "\"A dashboard is worth a thousand reports.\" – Ben Schneiderman",
  "\"Talk is cheap. Show me the code.\" – Linus Torvalds"
];

// Define the command interface
export interface Command {
  command: string;
  response: string | string[];
  timestamp?: string;
}

// Get current timestamp for command logging
export function getCurrentTimestamp() {
  const now = new Date();
  return `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;
}

// Display a random tech fact
export function getRandomFact() {
  const randomIndex = Math.floor(Math.random() * RANDOM_FACTS.length);
  return RANDOM_FACTS[randomIndex];
}

// Process user commands and return appropriate responses
export function processCommand(cmd: string): string | string[] {
  const trimmedCmd = cmd.trim().toLowerCase();
  
  // Handle project info command
  if (trimmedCmd.startsWith('projects info')) {
    const parts = trimmedCmd.split(' ');
    const projectNumber = parseInt(parts[2]);
    
    if (isNaN(projectNumber)) {
      return "Please specify a valid project number, e.g., 'projects info 1'";
    }
    
    const project = PROJECTS.find(p => p.id === projectNumber);
    
    if (project) {
      return [
        `${project.name}`,
        `${project.description}`,
        `Technologies: ${project.technologies}`,
        `Role: ${project.role}`,
        project.link ? `Link: ${project.link}` : ''
      ].filter(Boolean);
    } else {
      return `Project ${projectNumber} not found. Available projects are numbered 1-${PROJECTS.length}.`;
    }
  }
  
  // Handle main commands
  switch (trimmedCmd) {
    case 'whoami':
      return "Anderson Paulino – Full Stack Developer & Data Analyst";
    
    case 'skills --list':
      return TECHNICAL_SKILLS;
    
    case 'projects --latest':
      return [
        "🎮 Trade Game (2024)",
        "📊 Interactive Dashboard (2023)",
        "🚀 3D Product Showcase (2023)",
        "Type 'projects info [number]' for details"
      ];
    
    case 'contact --show':
      return CONTACT_INFO;
    
    case 'clear':
      return "Terminal cleared.";
    
    case 'experience':
      return EXPERIENCE;
    
    case 'education':
      return EDUCATION;
    
    case 'achievements':
      return ACHIEVEMENTS;
    
    case 'certificates':
      return CERTIFICATES;
    
    case 'languages':
      return LANGUAGES;
    
    case 'tools':
      return [
        "Development Tools:",
        ...TOOLS.development.map(tool => `- ${tool}`),
        "",
        "Version Control:",
        ...TOOLS.versionControl.map(tool => `- ${tool}`),
        "",
        "Cloud & Containerization:",
        ...TOOLS.cloudAndContainerization.map(tool => `- ${tool}`),
        "",
        "Design & Productivity:",
        ...TOOLS.designAndProductivity.map(tool => `- ${tool}`)
      ];
    
    case 'social --links':
      return SOCIAL_LINKS;
    
    case 'quote':
      const randomIndex = Math.floor(Math.random() * QUOTES.length);
      return QUOTES[randomIndex];
    
    case 'help':
      return SUPPORTED_COMMANDS.map(cmd => `${cmd.name} - ${cmd.description}`);
    
    case 'exit':
      return "Session terminated. Click 'Open Terminal' to restart.";
    
    case 'fact':
      return getRandomFact();
    
    case '':
      return "";
    
    default:
      return `Command not found: '${cmd}'. Try 'help' for a list of commands.`;
  }
}
