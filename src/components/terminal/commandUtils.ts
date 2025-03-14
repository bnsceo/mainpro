
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

export const RANDOM_FACTS = [
  "The first computer programmer was a woman named Ada Lovelace, who wrote the first algorithm for Charles Babbage's Analytical Engine in the 1840s.",
  "The term 'bug' in computing originated when Grace Hopper found a moth causing issues in the Harvard Mark II computer in 1947.",
  "JavaScript was created in just 10 days by Brendan Eich in 1995.",
  "The first website went live on August 6, 1991. It was dedicated to information on the World Wide Web project.",
  "Python was named after Monty Python, not the snake.",
  "The first computer virus was created in 1983 and was called the 'Elk Cloner'.",
];

export const QUOTES = [
  "\"The best way to predict the future is to invent it.\" – Alan Kay",
  "\"Code is like humor. When you have to explain it, it's bad.\" – Cory House",
  "\"Programming isn't about what you know; it's about what you can figure out.\" – Chris Pine",
  "\"The most disastrous thing that you can ever learn is your first programming language.\" – Alan Kay",
  "\"Simplicity is the soul of efficiency.\" – Austin Freeman",
  "\"First, solve the problem. Then, write the code.\" – John Johnson",
];

export interface Command {
  command: string;
  response: string | string[];
  timestamp?: string;
}

export function getCurrentTimestamp() {
  const now = new Date();
  return `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;
}

export function processCommand(cmd: string): string | string[] {
  const trimmedCmd = cmd.trim().toLowerCase();
  
  // Handle project info command
  if (trimmedCmd.startsWith('projects info')) {
    const parts = trimmedCmd.split(' ');
    const projectNumber = parseInt(parts[2]);
    
    if (isNaN(projectNumber)) {
      return "Please specify a valid project number, e.g., 'projects info 1'";
    }
    
    switch (projectNumber) {
      case 1:
        return [
          "🎮 Trade Game (2024)",
          "An interactive trading simulation game to maximize profits",
          "Technologies: JavaScript, HTML Canvas, CSS, Algorithm Design",
          "Role: Game Developer",
          "Link: https://anderson-s-projects.github.io/Trade-Game/"
        ];
      case 2:
        return [
          "📊 Interactive Dashboard (2023)",
          "Dynamic dashboard with real-time data visualization for business analytics",
          "Technologies: React, D3.js, CSS Grid, REST API",
          "Role: Frontend Developer",
        ];
      case 3:
        return [
          "🚀 3D Product Showcase (2023)",
          "Immersive 3D showcase for product exploration with smooth animations",
          "Technologies: Three.js, GSAP, WebGL, JavaScript",
          "Role: Interactive Developer",
        ];
      default:
        return `Project ${projectNumber} not found. Available projects are numbered 1-3.`;
    }
  }
  
  // Handle main commands
  switch (trimmedCmd) {
    case 'whoami':
      return "Anderson Paulino – Full Stack Developer & Data Analyst";
    case 'skills --list':
      return [
        "Frontend: React, TypeScript, Tailwind CSS",
        "Backend: Node.js, Python, SQL",
        "Data: Analytics, Visualization, Machine Learning",
        "Tools: Git, Docker, AWS",
        "Game Dev: JavaScript, HTML Canvas"
      ];
    case 'projects --latest':
      return [
        "🎮 Trade Game (2024)",
        "📊 Interactive Dashboard (2023)",
        "🚀 3D Product Showcase (2023)",
        "Type 'projects info [number]' for details"
      ];
    case 'contact --show':
      return [
        "Email: contact@digitalalchemist.com",
        "Phone: Available upon request",
        "LinkedIn: linkedin.com/in/andersonpaulino",
        "Website: digitalalchemist.com"
      ];
    case 'experience':
      return [
        "Senior Developer @ TechCorp (2022-Present)",
        "Data Analyst @ DataCo (2020-2022)",
        "Full Stack Developer @ WebSolutions (2018-2020)"
      ];
    case 'education':
      return [
        "MSc Computer Science - Tech University (2020)",
        "BSc Software Engineering - Code College (2018)"
      ];
    case 'achievements':
      return [
        "Led development team for award-winning logistics platform",
        "Reduced data processing time by 65% through algorithm optimization",
        "Published research paper on efficient data visualization techniques",
        "Created popular game simulation with over 10k plays",
        "Recognized as Employee of the Year (2021)"
      ];
    case 'certificates':
      return [
        "AWS Certified Solutions Architect",
        "Google Data Analytics Professional",
        "Meta Frontend Developer"
      ];
    case 'languages':
      return [
        "Python ████████░░ 80%",
        "JavaScript ███████░░░ 70%",
        "TypeScript ████████░░ 80%",
        "SQL ██████████ 100%"
      ];
    case 'tools':
      return [
        "VS Code, PyCharm, DataGrip",
        "Git, GitHub Actions, Jenkins",
        "Docker, Kubernetes, AWS",
        "Figma, Adobe XD"
      ];
    case 'social --links':
      return [
        "GitHub: github.com/digitalchemist",
        "LinkedIn: linkedin.com/in/andersonpaulino",
        "Twitter: @digital_alchemist"
      ];
    case 'quote':
      const randomIndex = Math.floor(Math.random() * QUOTES.length);
      return QUOTES[randomIndex];
    case 'help':
      return SUPPORTED_COMMANDS.map(cmd => `${cmd.name} - ${cmd.description}`);
    case 'exit':
      return "Session terminated. Click 'Open Terminal' to restart.";
    case '':
      return "";
    default:
      return `Command not found: '${cmd}'. Try 'help' for a list of commands.`;
  }
}
