
import React from 'react';

interface Command {
  command: string;
  response: string | string[];
  timestamp?: string;
}

interface TerminalOutputProps {
  commands: Command[];
  isTyping: boolean;
  outputRef: React.RefObject<HTMLDivElement>;
}

const TerminalOutput: React.FC<TerminalOutputProps> = ({ commands, isTyping, outputRef }) => {
  return (
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
  );
};

export default TerminalOutput;
