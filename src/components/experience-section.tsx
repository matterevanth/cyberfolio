import type { Experience } from '@/services/linkedin';
import ExperienceCard from './experience-card';
import { Briefcase } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ExperienceSectionProps {
  experiences: Experience[];
}

export default function ExperienceSection({ experiences }: ExperienceSectionProps) {
  // Sort experiences by start date, most recent first
  const sortedExperiences = experiences.sort((a, b) => {
    const dateAString = a.startDate?.replace('Present', '9999-12');
    const dateBString = b.startDate?.replace('Present', '9999-12');
    const isValidDateString = (ds: string | undefined) => ds && /^\d{4}-\d{2}$/.test(ds);
    const dateA = isValidDateString(dateAString) ? new Date(dateAString + '-01') : new Date(0);
    const dateB = isValidDateString(dateBString) ? new Date(dateBString + '-01') : new Date(0);
    return dateB.getTime() - dateA.getTime();
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-8"> {/* Increased bottom margin */}
         <span className="text-primary mr-1 font-mono">$</span> {/* Command prompt style */}
         <h2 className="text-xl font-semibold text-foreground tracking-tight flex items-center gap-2">
            <Briefcase className="h-5 w-5 text-primary" />
            Work Experience:
        </h2>
      </div>

      {/* Alternating Timeline Layout */}
      <div className="relative flow-root">
        {/* Vertical Timeline Line */}
        <div className="absolute left-1/2 top-0 -ml-px h-full w-0.5 bg-border/70" aria-hidden="true"></div>

        {sortedExperiences.length > 0 ? (
          sortedExperiences.map((exp, index) => (
            <div key={index} className="relative mb-12"> {/* Spacing between timeline items */}
               {/* Timeline Dot */}
              <span className={cn(
                  "absolute left-1/2 top-1 flex h-4 w-4 -translate-x-1/2 items-center justify-center rounded-full border-2 border-primary ring-4 ring-background",
                   index === 0 ? "bg-primary" : "bg-muted" // Highlight current/latest job dot differently if needed
              )} aria-hidden="true">
                 <span className={cn("h-1.5 w-1.5 rounded-full", index === 0 ? "bg-primary-foreground" : "bg-primary")}></span>
              </span>

              {/* Experience Card - Positioned left or right */}
              <div
                className={cn(
                  "relative animate-in fade-in duration-500 ease-out",
                  // Updated alignment logic: First item (index 0) on left, second (index 1) on right, etc.
                  index % 2 === 0 ? "md:mr-[55%] md:pr-6 md:text-right" : "md:ml-[55%] md:pl-6",
                  "ml-8 md:ml-0" // Default margin for small screens
                )}
                 style={{ animationDelay: `${index * 150}ms`, animationFillMode: 'backwards' }}
              >
                <ExperienceCard experience={exp} align={index % 2 === 0 ? 'left' : 'right'} />
              </div>
            </div>
          ))
        ) : (
           <div className="pl-4"> {/* Indent fallback message */}
              <p className="text-muted-foreground text-sm">// Experience information loading...</p>
           </div>
        )}
      </div>
    </div>
  );
}
