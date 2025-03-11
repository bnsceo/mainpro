
import React, { useRef } from 'react';
import { cn } from '@/lib/utils';

interface TerminalInputProps {
  inputValue: string;
  isTyping: boolean;
  terminalActive: boolean;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

const TerminalInput: React.FC<TerminalInputProps> = ({
  inputValue,
  isTyping,
  terminalActive,
  onInputChange,
  onKeyPress
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="absolute bottom-0 left-0 right-0 flex items-center px-4 py-2 bg-black/90 border-t border-primary/20">
      <span className="text-secondary mr-2">&gt;</span>
      <input
        ref={inputRef}
        type="text"
        value={inputValue}
        onChange={onInputChange}
        onKeyDown={onKeyPress}
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
  );
};

export default TerminalInput;
