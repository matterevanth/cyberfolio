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
        // Keep cursor blinking after finishing for a moment
        // setTimeout(() => setShowCursor(false), 1500); // Optional: Hide cursor after a delay
      }
    }, speed);

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, [text, speed]);

  // Blinking cursor effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530); // Standard cursor blink speed

    return () => clearInterval(cursorInterval);
  }, []); // Run once on mount

  return (
    <p className={cn('relative font-mono', className)} {...props}> {/* Ensure mono font */}
      {displayedText}
      {/* Blinking block cursor */}
      <span
        className={cn(
          'ml-0.5 inline-block h-[1.1em] w-[0.6em] -mb-[0.15em] align-middle', // Size and alignment
          'animate-pulse', // Use pulse animation
          showCursor ? 'bg-current' : 'bg-transparent', // Show/hide based on state
          cursorClassName
        )}
        aria-hidden="true"
      ></span>
    </p>
  );
}
