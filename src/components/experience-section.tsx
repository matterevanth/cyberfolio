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
    const dateA = a.startDate === 'Present' ? new Date() : new Date(a.startDate);
    const dateB = b.startDate === 'Present' ? new Date() : new Date(b.startDate);
    return dateB.getTime() - dateA.getTime();
  });

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3 mb-8"> {/* Increased bottom margin */}
         <Briefcase className="h-6 w-6 text-primary" />
        <h2 className="text-2xl font-semibold text-foreground tracking-tight">Work Experience</h2>
      </div>
      <div className="relative pl-6 border-l-2 border-border/30 ml-3"> {/* Timeline line with padding */}
        {sortedExperiences.length > 0 ? (
          sortedExperiences.map((exp, index) => (
            <div key={index} className="mb-10 last:mb-0"> {/* Spacing between timeline items */}
              {/* Timeline Dot */}
              <span className={cn(
                  "absolute -left-[0.87rem] flex h-6 w-6 items-center justify-center rounded-full ring-4 ring-background",
                  index === 0 ? "bg-primary" : "bg-muted border border-primary/30" // Highlight current/latest job
              )}>
                 <Briefcase className={cn("h-3 w-3", index === 0 ? "text-primary-foreground": "text-primary")} />
              </span>

              {/* Experience Card - Positioned to the right of the line */}
              <div className="ml-4"> {/* Adjust margin if needed */}
                <ExperienceCard experience={exp} />
              </div>
            </div>
          ))
        ) : (
           <div className="pl-4"> {/* Indent fallback message */}
              <p className="text-muted-foreground">Experience information is currently being updated.</p>
           </div>
        )}
      </div>
    </div>
  );
}
