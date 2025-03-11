
import React, { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import TerminalHeader from './terminal/TerminalHeader';
import TerminalOutput from './terminal/TerminalOutput';
import TerminalInput from './terminal/TerminalInput';
import TerminalOverlay from './terminal/TerminalOverlay';
import { Command, getCurrentTimestamp, processCommand } from './terminal/commandUtils';

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
  const outputRef = useRef<HTMLDivElement>(null);

  const mounted = useRef(true);

  useEffect(() => {
    console.log("CyberpunkTerminal mounted");
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [commands]);

  useEffect(() => {
    const handleTerminalClick = () => {
      const inputs = terminalRef.current?.querySelectorAll('input');
      if (inputs && inputs.length > 0 && terminalActive) {
        inputs[0].focus();
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

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!terminalRef.current || !terminalActive) return;
      
      const terminal = terminalRef.current;
      const rect = terminal.getBoundingClientRect();
      
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const rotX = ((e.clientY - centerY) / rect.height) * 8;
      const rotY = -((e.clientX - centerX) / rect.width) * 8;
      
      setRotateX(rotX);
      setRotateY(rotY);
      setTranslateZ(5);
    };
    
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

  useEffect(() => {
    const glitchInterval = setInterval(() => {
      if (!mounted.current) return;
      
      setGlitchActive(true);
      setTimeout(() => {
        if (mounted.current) {
          setGlitchActive(false);
        }
      }, 150);
    }, Math.random() * 10000 + 5000);
    
    return () => clearInterval(glitchInterval);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !isTyping) {
      const command = inputValue;
      setInputValue('');
      
      const newCommand: Command = {
        command,
        response: '',
        timestamp: getCurrentTimestamp()
      };
      
      setCommands(prev => [...prev, newCommand]);
      
      setIsTyping(true);
      
      const response = processCommand(command);
      
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
        }, 500);
      } else {
        // Clear the terminal
        setCommands([]);
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
      <TerminalHeader />
      <TerminalOutput commands={commands} isTyping={isTyping} outputRef={outputRef} />
      <TerminalInput 
        inputValue={inputValue}
        isTyping={isTyping}
        terminalActive={terminalActive}
        onInputChange={handleInputChange}
        onKeyPress={handleKeyPress}
      />
      <TerminalOverlay />
    </div>
  );
};

export default CyberpunkTerminal;
