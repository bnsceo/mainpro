
import React from 'react';

const TerminalHeader = () => {
  return (
    <div className="flex items-center justify-between px-4 py-2 bg-black/80 border-b border-primary/20">
      <div className="flex items-center space-x-2">
        <div className="w-3 h-3 rounded-full bg-red-500"></div>
        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
        <div className="w-3 h-3 rounded-full bg-green-500"></div>
      </div>
      <div className="text-xs font-mono text-primary/70">NEURA-LINK TERMINAL</div>
      <div className="text-xs font-mono text-primary/70">v4.2.1</div>
    </div>
  );
};

export default TerminalHeader;
