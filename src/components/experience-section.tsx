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
    // Handle 'Present' case by setting it to a very future date for sorting
    const dateAString = a.startDate?.replace('Present', '9999-12');
    const dateBString = b.startDate?.replace('Present', '9999-12');

    // Ensure dates are valid before creating Date objects
    // Basic check for YYYY-MM format
    const isValidDateString = (ds: string | undefined) => ds && /^\d{4}-\d{2}$/.test(ds);

    const dateA = isValidDateString(dateAString) ? new Date(dateAString + '-01') : new Date(0); // Use day 01, fallback to epoch start
    const dateB = isValidDateString(dateBString) ? new Date(dateBString + '-01') : new Date(0); // Use day 01, fallback to epoch start

    return dateB.getTime() - dateA.getTime();
  });


  return (
    <div className="space-y-6"> {/* Reduced spacing */}
      <div className="flex items-center gap-2 mb-6"> {/* Reduced bottom margin */}
         <span className="text-primary mr-1 font-mono">$</span> {/* Command prompt style */}
         <h2 className="text-xl font-semibold text-foreground tracking-tight flex items-center gap-2">
            <Briefcase className="h-5 w-5 text-primary" />
            Work Experience:
        </h2>
      </div>
      {/* Terminal timeline: Use border color, adjust padding/margin */}
      <div className="relative pl-5 border-l border-border/70 ml-2"> {/* Adjusted padding/margin */}
        {sortedExperiences.length > 0 ? (
          sortedExperiences.map((exp, index) => (
            <div key={index} className="mb-8 last:mb-0"> {/* Spacing between timeline items */}
              {/* Terminal Timeline Dot: Smaller, square-ish, different colors */}
              {/* Added pulse animation */}
              <span className={cn(
                  "absolute -left-[0.6rem] flex h-4 w-4 items-center justify-center border border-primary ring-2 ring-background", // Smaller, border, ring
                  index === 0 ? "bg-primary" : "bg-muted", // Highlight current/latest job
                   // Apply pulse animation conditionally or always
                  "rounded-sm animate-pulse duration-1000 delay-100" // Add pulse animation
              )}>
                 <Briefcase className={cn("h-2 w-2", index === 0 ? "text-primary-foreground": "text-primary")} />
              </span>

              {/* Experience Card - Positioned to the right of the line */}
              {/* Added fade-in animation with stagger */}
              <div className="ml-4 animate-in fade-in slide-in-from-left-4 duration-500 ease-out" style={{ animationDelay: `${index * 100}ms` }}> {/* Keep margin */}
                 {/* Pass index to ExperienceCard */}
                <ExperienceCard experience={exp} index={index} />
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
