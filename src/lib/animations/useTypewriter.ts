
import { useState, useEffect } from 'react';

// Typewriter effect hook
export const useTypewriter = (text: string, speed = 100, delay = 1000) => {
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  
  useEffect(() => {
    let i = 0;
    let timeout: NodeJS.Timeout;
    
    if (isTyping) {
      const typing = () => {
        if (i < text.length) {
          setDisplayText(prev => prev + text.charAt(i));
          i++;
          timeout = setTimeout(typing, speed);
        } else {
          setIsTyping(false);
          timeout = setTimeout(() => setIsTyping(true), delay);
        }
      };
      
      timeout = setTimeout(typing, delay);
    } else {
      const erasing = () => {
        if (i > 0) {
          i--;
          setDisplayText(text.substring(0, i));
          timeout = setTimeout(erasing, speed / 2);
        } else {
          setIsTyping(true);
        }
      };
      
      timeout = setTimeout(erasing, delay);
    }
    
    return () => clearTimeout(timeout);
  }, [text, speed, delay, isTyping]);
  
  return displayText;
};
