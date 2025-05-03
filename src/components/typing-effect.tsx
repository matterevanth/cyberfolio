'use client';

import { useState, useEffect, type HTMLAttributes, type ElementType } from 'react';
import { cn } from '@/lib/utils';

// Extend props to accept elementType
interface TypingEffectProps<T extends ElementType = 'p'> extends HTMLAttributes<HTMLElement> {
  text: string;
  speed?: number; // Milliseconds per character
  cursorClassName?: string;
  elementType?: T; // Allow specifying the element type
}

export default function TypingEffect<T extends ElementType = 'p'>({
  text,
  speed = 50, // Default speed
  className,
  cursorClassName,
  elementType: Component = 'p', // Default to 'p' if not provided
  ...props
}: TypingEffectProps<T>) {
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

  // Use the specified Component (defaults to 'p')
  return (
    <Component className={cn('relative font-mono', className)} {...props}>
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
    </Component>
  );
}
