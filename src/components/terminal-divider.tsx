import { cn } from '@/lib/utils';

interface TerminalDividerProps {
  className?: string;
}

/**
 * A thematic divider component styled like a terminal output separator.
 */
export default function TerminalDivider({ className }: TerminalDividerProps) {
  return (
    <div
      className={cn(
        'flex items-center justify-center my-8 md:my-10 lg:my-12', // Adjust margins as needed
        className
      )}
      aria-hidden="true"
    >
      <span className="text-primary font-mono text-xs tracking-widest">
        {'='.repeat(15)} {/* Equal signs for a blocky look */}
        <span className="mx-2 text-muted-foreground">[EOF]</span> {/* End of file marker */}
        {'='.repeat(15)}
      </span>
    </div>
  );
}
