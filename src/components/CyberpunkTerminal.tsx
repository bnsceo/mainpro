
import React, { useState, useEffect, useRef } from 'react';
import { useTypewriter } from '@/lib/animations';
import { cn } from '@/lib/utils';

interface Command {
  command: string;
  response: string | string[];
  timestamp?: string;
}

const SUPPORTED_COMMANDS = [
  { name: 'whoami', description: 'Display user identity' },
  { name: 'skills --list', description: 'Show skill set' },
  { name: 'projects --latest', description: 'View recent projects' },
  { name: 'contact --show', description: 'Display contact information' },
  { name: 'clear', description: 'Clear terminal screen' },
  { name: 'randomfact', description: 'Display a random coding fact' },
  { name: 'quote', description: 'Show a motivational quote' },
  { name: 'help', description: 'List available commands' },
  { name: 'exit', description: 'End terminal session' },
];

const RANDOM_FACTS = [
  "The first computer programmer was a woman named Ada Lovelace, who wrote the first algorithm for Charles Babbage's Analytical Engine in the 1840s.",
  "The term 'bug' in computing originated when Grace Hopper found a moth causing issues in the Harvard Mark II computer in 1947.",
  "JavaScript was created in just 10 days by Brendan Eich in 1995.",
  "The first website went live on August 6, 1991. It was dedicated to information on the World Wide Web project.",
  "Python was named after Monty Python, not the snake.",
  "The first computer virus was created in 1983 and was called the 'Elk Cloner'.",
];

const QUOTES = [
  "\"The best way to predict the future is to invent it.\" – Alan Kay",
  "\"Code is like humor. When you have to explain it, it's bad.\" – Cory House",
  "\"Programming isn't about what you know; it's about what you can figure out.\" – Chris Pine",
  "\"The most disastrous thing that you can ever learn is your first programming language.\" – Alan Kay",
  "\"Simplicity is the soul of efficiency.\" – Austin Freeman",
  "\"First, solve the problem. Then, write the code.\" – John Johnson",
];

const CyberpunkTerminal: React.FC = () => {
  const [commands, setCommands] = useState<Command[]>([
    { 
      command: '', 
      response: [
        "// TERMINAL v4.2.1 INITIALIZED",
        "// ESTABLISHING SECURE CONNECTION...",
        "// CONNECTION ESTABLISHED",
        "// TYPE 'help' FOR AVAILABLE COMMANDS"
      ],
      timestamp: getCurrentTimestamp() 
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [glitchActive, setGlitchActive] = useState(false);
  const [terminalActive, setTerminalActive] = useState(true);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [translateZ, setTranslateZ] = useState(0);
  
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);

  // Track if component is mounted to avoid state updates on unmounted component
  const mounted = useRef(true);

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  function getCurrentTimestamp() {
    const now = new Date();
    return `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;
  }

  // 3D perspective effect based on mouse position
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!terminalRef.current || !terminalActive) return;
      
      const terminal = terminalRef.current;
      const rect = terminal.getBoundingClientRect();
      
      // Calculate mouse position relative to the center of the terminal
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      // Calculate rotation based on mouse distance from center
      const rotX = ((e.clientY - centerY) / rect.height) * 8; // Max 8 degrees rotation
      const rotY = -((e.clientX - centerX) / rect.width) * 8; // Max 8 degrees rotation
      
      // Apply the rotation with a slight delay for smooth effect
      setRotateX(rotX);
      setRotateY(rotY);
      setTranslateZ(5); // Slight hover effect when mouse moves
    };
    
    // Reset position when mouse leaves
    const handleMouseLeave = () => {
      setRotateX(0);
      setRotateY(0);
      setTranslateZ(0);
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [terminalActive]);

  // Scroll to bottom of terminal when new command is added
  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [commands]);

  // Focus input when terminal is clicked
  useEffect(() => {
    const handleTerminalClick = () => {
      if (inputRef.current && terminalActive) {
        inputRef.current.focus();
      }
    };
    
    const terminal = terminalRef.current;
    if (terminal) {
      terminal.addEventListener('click', handleTerminalClick);
    }
    
    return () => {
      if (terminal) {
        terminal.removeEventListener('click', handleTerminalClick);
      }
    };
  }, [terminalActive]);

  // Random glitch effect
  useEffect(() => {
    const glitchInterval = setInterval(() => {
      if (!mounted.current) return;
      
      setGlitchActive(true);
      setTimeout(() => {
        if (mounted.current) {
          setGlitchActive(false);
        }
      }, 150);
    }, Math.random() * 10000 + 5000); // Random interval between 5-15 seconds
    
    return () => clearInterval(glitchInterval);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const processCommand = (cmd: string): string | string[] => {
    const trimmedCmd = cmd.trim().toLowerCase();
    
    if (trimmedCmd === 'whoami') {
      return "Anderson Paulino – Developer | Data Analyst";
    } else if (trimmedCmd === 'skills --list') {
      return "Python, SQL, JavaScript, React, Data Visualization, APIs";
    } else if (trimmedCmd === 'projects --latest') {
      return "[🚀 Truck Dispatching Platform], [📊 Data Visualization Tool]";
    } else if (trimmedCmd === 'contact --show') {
      return "Email: youremail@example.com | LinkedIn: linkedin.com/in/andersonpaulino";
    } else if (trimmedCmd === 'clear') {
      setCommands([]);
      return "";
    } else if (trimmedCmd === 'randomfact') {
      const randomIndex = Math.floor(Math.random() * RANDOM_FACTS.length);
      return RANDOM_FACTS[randomIndex];
    } else if (trimmedCmd === 'quote') {
      const randomIndex = Math.floor(Math.random() * QUOTES.length);
      return QUOTES[randomIndex];
    } else if (trimmedCmd === 'help') {
      return SUPPORTED_COMMANDS.map(cmd => `${cmd.name} - ${cmd.description}`);
    } else if (trimmedCmd === 'exit') {
      setTimeout(() => {
        if (mounted.current) {
          setTerminalActive(false);
        }
      }, 1000);
      return "Session terminated. Reload to restart.";
    } else if (trimmedCmd === '') {
      return "";
    } else {
      return `Command not found: '${cmd}'. Try 'help' for a list of commands.`;
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !isTyping) {
      const command = inputValue;
      setInputValue('');
      
      // Add command to history
      const newCommand: Command = {
        command,
        response: '',
        timestamp: getCurrentTimestamp()
      };
      
      setCommands(prev => [...prev, newCommand]);
      
      // Process command and set response with typing effect
      setIsTyping(true);
      
      const response = processCommand(command);
      
      // If the command is 'clear', we don't need to update the response
      if (command.trim().toLowerCase() !== 'clear') {
        setTimeout(() => {
          if (mounted.current) {
            setCommands(prev => {
              const updated = [...prev];
              const lastCommandIndex = updated.length - 1;
              updated[lastCommandIndex].response = response;
              return updated;
            });
            setIsTyping(false);
          }
        }, 500); // Simulate processing delay
      } else {
        setIsTyping(false);
      }
    }
  };

  return (
    <div 
      ref={terminalRef}
      className={cn(
        "relative w-full max-w-[500px] h-[350px] m-auto rounded-lg overflow-hidden cyberpunk-terminal",
        glitchActive && "glitch",
        !terminalActive && "terminal-fade-out"
      )}
      style={{
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(${translateZ}px)`,
        transition: 'transform 0.2s ease-out'
      }}
    >
      {/* Terminal header */}
      <div className="flex items-center justify-between px-4 py-2 bg-black/80 border-b border-primary/20">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <div className="text-xs font-mono text-primary/70">NEURA-LINK TERMINAL</div>
        <div className="text-xs font-mono text-primary/70">v4.2.1</div>
      </div>
      
      {/* Terminal output */}
      <div 
        ref={outputRef}
        className="h-[calc(100%-70px)] p-4 font-mono text-sm overflow-y-auto bg-black/70 backdrop-blur-sm"
      >
        {commands.map((cmd, index) => (
          <div key={index} className="mb-2">
            {cmd.command && (
              <div className="flex items-center text-green-400 mb-1">
                <span className="text-primary/70 mr-2">[{cmd.timestamp}]</span>
                <span className="text-secondary mr-1">&gt;</span> 
                <span>{cmd.command}</span>
              </div>
            )}
            {Array.isArray(cmd.response) ? (
              cmd.response.map((line, i) => (
                <div key={i} className="text-white/90 pl-5">{line}</div>
              ))
            ) : (
              cmd.response && <div className="text-white/90 pl-5">{cmd.response}</div>
            )}
          </div>
        ))}
        {isTyping && (
          <div className="flex items-center text-green-400">
            <span className="typing-indicator">Processing...</span>
          </div>
        )}
      </div>
      
      {/* Terminal input */}
      <div className="absolute bottom-0 left-0 right-0 flex items-center px-4 py-2 bg-black/90 border-t border-primary/20">
        <span className="text-secondary mr-2">&gt;</span>
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyPress}
          className="flex-1 bg-transparent text-white/90 outline-none font-mono"
          placeholder="Type a command (try 'help')"
          autoFocus
          disabled={!terminalActive || isTyping}
        />
        <div className={cn(
          "w-2 h-4 bg-primary animate-pulse", 
          isTyping && "opacity-0"
        )}></div>
      </div>
      
      {/* Terminal overlay effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent opacity-30"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTgiIGhlaWdodD0iMTgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iLjAyIi8+PC9zdmc+')] opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-primary/10"></div>
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
        <div className="absolute top-0 bottom-0 left-0 w-[1px] bg-gradient-to-b from-transparent via-primary/50 to-transparent"></div>
        <div className="absolute top-0 bottom-0 right-0 w-[1px] bg-gradient-to-b from-transparent via-primary/50 to-transparent"></div>
      </div>
    </div>
  );
};

export default CyberpunkTerminal;
