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
  "The Space Shuttle's computers had less processing power than a modern smartphone.",
  "The 'Ctrl + Alt + Delete' command was invented by IBM engineer David Bradley as a quick reboot shortcut.",
  "You can fit all the data from early Apollo moon missions on a single modern USB drive.",
  "The world’s first 1GB hard drive was introduced by IBM in 1980 and cost $40,000.",
  "Google was originally called 'Backrub' before it was renamed in 1997.",
  "The floppy disk was invented by IBM in 1967 and could store just 80KB of data.",
  "Dennis Ritchie, the creator of the C programming language, also helped develop Unix.",
  "Facebook's first homepage featured a hidden image of Al Pacino.",
  "The first email ever sent was by Ray Tomlinson in 1971, and it was just a test message like 'QWERTYUIOP'.",
  "The Unicode standard includes over 143,000 characters from different writing systems around the world.",
  "A single Google search uses more computing power than the entire Apollo 11 moon landing mission.",
];

export const QUOTES = [
  "\"The best way to predict the future is to invent it.\" – Alan Kay",
  "\"Code is like humor. When you have to explain it, it's bad.\" – Cory House",
  "\"Programming isn't about what you know; it's about what you can figure out.\" – Chris Pine",
  "\"The most disastrous thing that you can ever learn is your first programming language.\" – Alan Kay",
  "\"Simplicity is the soul of efficiency.\" – Austin Freeman",
  "\"First, solve the problem. Then, write the code.\" – John Johnson",
  "\"Any sufficiently advanced technology is indistinguishable from magic.\" – Arthur C. Clarke",
  "\"Software is like entropy: It is difficult to grasp, weighs nothing, and obeys the Second Law of Thermodynamics; i.e., it always increases.\" – Norman Augustine",
  "\"The function of good software is to make the complex appear to be simple.\" – Grady Booch",
  "\"Computers are useless. They can only give you answers.\" – Pablo Picasso",
  "\"Everybody in this country should learn to program a computer because it teaches you how to think.\" – Steve Jobs",
  "\"Walking on water and developing software from a specification are easy if both are frozen.\" – Edward V. Berard",
  "\"A language that doesn't affect the way you think about programming is not worth knowing.\" – Alan Perlis",
  "\"Measuring programming progress by lines of code is like measuring aircraft building progress by weight.\" – Bill Gates",
  "\"Talk is cheap. Show me the code.\" – Linus Torvalds",
  "\"Good programmers write code that humans can understand.\" – Martin Fowler",
  "\"You might not think that programmers are artists, but programming is an extremely creative profession. It's logic-based creativity.\" – John Romero",
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
    case 'skills --ls':
      return [
        "Frontend: React, TypeScript, Tailwind CSS",
        "Backend: Node.js, Python, SQL",
        "Data: Analytics, Visualization, Machine Learning",
        "Tools: Git, Docker, AWS",
        "Game Dev: JavaScript, HTML Canvas"
      ];
    case 'projects --latest':
      return [
        "🎮 Stock Trading Game (2024)",
        "📊 Interactive Dashboard (2023)",
        "Type 'projects info [number]' for details"
      ];
    case 'contact --ls':
  return [
    "For any inquiries, please fill out the contact form below.",
    "Email: Available upon request",
    "Phone: Available upon request",
    "LinkedIn: https://www.linkedin.com/in/82anderson-paulino/",
    "Website: Wookyleaks.com"
  ];

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

export const QUOTES = [
  "\"The best way to predict the future is to invent it.\" – Alan Kay",
  "\"Code is like humor. When you have to explain it, it's bad.\" – Cory House",
  "\"Programming isn't about what you know; it's about what you can figure out.\" – Chris Pine",
  "\"The most disastrous thing that you can ever learn is your first programming language.\" – Alan Kay",
  "\"Simplicity is the soul of efficiency.\" – Austin Freeman",
  "\"First, solve the problem. Then, write the code.\" – John Johnson",
  "\"Data is the new oil, but just like oil, it must be refined before it can be useful.\" – Clive Humby",
  "\"Security is always excessive until it's not enough.\" – Robbie Sinclair",
  "\"If you automate a mess, you get an automated mess.\" – Rod Michael",
  "\"A dashboard is worth a thousand reports.\" – Ben Schneiderman"
];

export const TECHNICAL_SKILLS = [
  "Cybersecurity Awareness",
  "Analytical Skills, Statistical Analysis",
  "Writing & Reporting Skills",
  "Teamwork & Team Management",
  "Front-End Web Development (HTML, CSS, JavaScript, React Native)",
  "Responsive Web Design",
  "Digital Marketing Strategy",
  "Data Analysis & Business Intelligence",
  "Data Visualization & Dashboard Development",
  "Python Programming (Data Types, Functions, Classes)",
  "Virtualization (Using VirtualBox for OS Testing)",
  "E-commerce Platforms (Shopify, Wix, WordPress)",
  "Graphic Design (Adobe Photoshop, Illustrator)",
  "AI & Automation (ChatGPT, Claude, Anthropic AI Systems)"
];

export const EXPERIENCE = [
  "Shift Supervisor @ Allied Universal (2020-2024) - Led security teams, managed site operations, and provided customer service at financial institutions and luxury malls.",
  "Distribution Manager @ Cityline Distributors (2015-2019) - Managed logistics, compiled reports, processed transactions, and resolved customer complaints."
];

export const EDUCATION = [
  "Continuing Education @ CUNY Bronx Community College"
];

case 'achievements':
      return [
        "Led security team for prestigious locations",
        "Recognized as Employee of the Year (2021)",
        "Developed a retro-styled stock trading game simulation."
      ];

export const CERTIFICATES = [
  "Google Data Analytics Professional",
  "Google Digital Marketing & E-commerce",
  "Automate Cybersecurity Tasks with Python",
  "Fundamentals of Data Governance",
  "Cybersecurity Case Studies & Capstone Project",
  "HTML, CSS, and JavaScript for Web Developers"
];

export const LANGUAGES = [
  "English (Fluent)",
  "Spanish (Fluent)"
];

export const TOOLS = {
  // Code editors, IDEs, and virtualization tools
  development: [
    "VS Code",
    "Xcode",
    "Virtual Box",
  ],
  // Version control systems and CI/CD tools
  versionControl: [
    "GitHub",
    "GitHub Actions",
    "Jenkins",
  ],
  // Containerization and cloud platforms
  cloudAndContainerization: [
    "AWS",
    "Azure",
    "Google Cloud Platform (GCP)"
  ],
  // Design, creative, and productivity tools
  designAndProductivity: [
    "Midjourney",  // adjusted capitalization and spacing
    "Canvas",
    "Figma",
    "Adobe XD",
    "Microsoft Office Suite",
    "Linex",       // if this should be "Linux", consider moving it to "development"
  ]
};

    case 'social --links':
      return [
        "GitHub: https://github.com/Anderson-s-Projects/",
        "LinkedIn: https://www.linkedin.com/in/82anderson-paulino/",
        "Twitter: @wookyleaks"
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
