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
            <div key={index} className="relative mb-12 md:grid md:grid-cols-2 md:items-start md:gap-x-8">
               {/* Dot Container Removed */}

              {/* Experience Card Container */}
              <div
                className={cn(
                  "relative animate-in fade-in duration-500 ease-out",
                   // Determine grid column and row start for md+
                   index % 2 === 0
                     ? 'md:col-start-2 md:row-start-1' // Card on right
                     : 'md:col-start-1 md:row-start-1', // Card on left
                   // Mobile layout: Adjust padding/margin if needed after dot removal
                   // Assuming the alignment is handled by the grid now, remove ml-8
                   "md:ml-0", // Ensure no extra margin on desktop
                   // Ensure card content aligns correctly (handled within ExperienceCard via prop)
                )}
                 style={{ animationDelay: `${index * 150}ms`, animationFillMode: 'backwards' }}
              >
                {/* Pass the correct alignment prop based on the card's position */}
                <ExperienceCard experience={exp} align={index % 2 !== 0 ? 'right' : 'left'} />
              </div>
            </div>
          ))
        ) : (
           // Adjust fallback message positioning if needed
           <div className="pl-8 md:pl-0 md:col-span-2 text-center">
              <p className="text-muted-foreground text-sm">// Experience information loading...</p>
           </div>
        )}
      </div>
    </div>
  );
}


