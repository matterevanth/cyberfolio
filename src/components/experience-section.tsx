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
        {/* Adjusted line position slightly to avoid overlap with dots */}
        <div className="absolute left-1/2 top-2 -ml-px h-[calc(100%-1rem)] w-0.5 bg-border/70" aria-hidden="true"></div>

        {sortedExperiences.length > 0 ? (
          sortedExperiences.map((exp, index) => (
            <div key={index} className="relative mb-12 md:grid md:grid-cols-2 md:items-start md:gap-8"> {/* Use grid for alignment */}
               {/* Timeline Dot - Positioned relative to the grid column */}
               <div className={cn("relative order-1", index % 2 === 0 ? 'md:col-start-1' : 'md:col-start-2')}>
                 <span className={cn(
                    "absolute left-1/2 top-1 flex h-4 w-4 -translate-x-1/2 items-center justify-center rounded-full border-2 border-primary ring-4 ring-background",
                    // Position dot absolutely within its grid cell for mobile, relative for md+
                    "md:relative md:left-auto md:top-auto md:translate-x-0",
                    // Align dot to the line on md+ screens
                    index % 2 === 0 ? 'md:ml-auto md:mr-[-9px]' : 'md:mr-auto md:ml-[-9px]',
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
                     ? 'md:col-start-1 md:row-start-1'
                     : 'md:col-start-2 md:row-start-1',
                   // Mobile layout: margin left to clear absolute positioned dot
                   "ml-8 md:ml-0",
                   // Align card to the correct side of the timeline on md+
                   index % 2 === 0 ? 'md:mr-4 lg:mr-6' : 'md:ml-4 lg:ml-6'
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
