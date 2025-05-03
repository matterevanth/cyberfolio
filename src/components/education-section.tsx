import type { Education } from '@/services/linkedin';
import EducationCard from './education-card';
// Removed unused Card imports
import { GraduationCap } from 'lucide-react';
import { cn } from '@/lib/utils'; // Import cn

interface EducationSectionProps {
  educations: Education[];
}

export default function EducationSection({ educations }: EducationSectionProps) {
  // Sort educations by start date, most recent first
  const sortedEducations = educations.sort((a, b) => {
    // Basic check for YYYY-MM format
    const isValidDateString = (ds: string | undefined) => ds && /^\d{4}-\d{2}$/.test(ds);
    const dateA = isValidDateString(a.startDate) ? new Date(a.startDate + '-01') : new Date(0);
    const dateB = isValidDateString(b.startDate) ? new Date(b.startDate + '-01') : new Date(0);
    return dateB.getTime() - dateA.getTime();
  });

  return (
     <div className="space-y-6"> {/* Reduced spacing */}
      <div className="flex items-center gap-2 mb-4"> {/* Reduced spacing */}
         <span className="text-primary mr-1 font-mono">$</span> {/* Command prompt style */}
         <h2 className="text-xl font-semibold text-foreground tracking-tight flex items-center gap-2">
            <GraduationCap className="h-5 w-5 text-primary" />
            Education:
        </h2>
      </div>
      {/* Terminal card list style: reduced gap */}
      <div className="space-y-4">
        {sortedEducations.length > 0 ? (
          sortedEducations.map((edu, index) => (
             // Added fade-in animation with stagger
            <div key={index} className="animate-in fade-in slide-in-from-bottom-4 duration-500 ease-out" style={{ animationDelay: `${index * 100}ms` }}>
              <EducationCard education={edu} />
            </div>
          ))
        ) : (
          <p className="text-muted-foreground text-sm">// Education details loading...</p>
        )}
      </div>
    </div>
  );
}
