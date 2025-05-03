'use client';

import { useState, useEffect, type HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface TypingEffectProps extends HTMLAttributes<HTMLParagraphElement> {
  text: string;
  speed?: number; // Milliseconds per character
  cursorClassName?: string;
}

export default function TypingEffect({
  text,
  speed = 50, // Default speed
  className,
  cursorClassName,
  ...props
}: TypingEffectProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    setDisplayedText(''); // Reset on text change
    let index = 0;
    const intervalId = setInterval(() => {
      if (index < text.length) {
        setDisplayedText((prev) => prev + text.charAt(index));
        index++;
      } else {
        clearInterval(intervalId);
        setShowCursor(false); // Hide cursor when done
      }
    }, speed);

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, [text, speed]);

  // Blinking cursor effect (only while typing)
  useEffect(() => {
    if (displayedText.length < text.length) {
       const cursorInterval = setInterval(() => {
         setShowCursor((prev) => !prev);
       }, 500); // Cursor blink speed
       return () => clearInterval(cursorInterval);
    } else {
         setShowCursor(false); // Ensure cursor is off when typing finished
    }
  }, [displayedText, text.length]);


  return (
    <p className={cn('relative', className)} {...props}>
      {displayedText}
      {showCursor && <span className={cn('inline-block h-[1em] w-[1px] bg-current align-text-bottom ml-0.5 animate-pulse', cursorClassName)}></span>}
    </p>
  );
}
