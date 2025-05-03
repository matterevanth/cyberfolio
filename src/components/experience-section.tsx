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
        {/* Vertical Timeline Line: Centered using left-1/2 and translate-x-1/2 */}
        <div className="absolute left-1/2 top-2 -translate-x-1/2 h-[calc(100%-1rem)] w-0.5 bg-border/70" aria-hidden="true"></div>

        {sortedExperiences.length > 0 ? (
          sortedExperiences.map((exp, index) => (
            <div key={index} className="relative mb-12 md:grid md:grid-cols-2 md:items-start md:gap-x-8"> {/* Use grid for alignment, added gap-x */}
               {/* Timeline Dot Container: Positions the dot relative to the grid column */}
               <div className={cn(
                   "absolute top-2.5 left-1/2 -translate-x-1/2 md:relative md:top-auto md:left-auto md:translate-x-0 md:flex md:justify-center", // Center dot on mobile, use grid for desktop
                   index % 2 === 0 ? 'md:col-start-1 md:flex-row-reverse' : 'md:col-start-2 md:flex-row' // Place dot container in correct column
                )}>
                 {/* The actual Dot: Centered on the line */}
                 <span className={cn(
                    "flex h-4 w-4 items-center justify-center rounded-full border-2 border-primary ring-4 ring-background",
                    // Align dot precisely on the center line for desktop using margin auto
                    index % 2 === 0 ? 'md:mr-[-8px]' : 'md:ml-[-8px]', // Adjust margin to center 16px dot over 2px line
                     index === 0 ? "bg-primary" : "bg-muted"
                  )} aria-hidden="true">
                     <span className={cn("h-1.5 w-1.5 rounded-full", index === 0 ? "bg-primary-foreground" : "bg-primary")}></span>
                  </span>
               </div>

              {/* Experience Card Container */}
              <div
                className={cn(
                  "relative animate-in fade-in duration-500 ease-out",
                   // Determine grid column and row start for md+
                   index % 2 === 0
                     ? 'md:col-start-2 md:row-start-1' // Card on right
                     : 'md:col-start-1 md:row-start-1', // Card on left
                   // Mobile layout: margin left to clear absolute positioned dot
                   "ml-8 md:ml-0",
                   // Align card text based on side
                   index % 2 !== 0 ? 'md:text-right' : 'md:text-left'
                )}
                 style={{ animationDelay: `${index * 150}ms`, animationFillMode: 'backwards' }}
              >
                {/* Pass the correct alignment prop based on the card's position */}
                <ExperienceCard experience={exp} align={index % 2 !== 0 ? 'right' : 'left'} />
              </div>
            </div>
          ))
        ) : (
           <div className="pl-8"> {/* Indent fallback message relative to timeline */}
              <p className="text-muted-foreground text-sm">// Experience information loading...</p>
           </div>
        )}
      </div>
    </div>
  );
}

