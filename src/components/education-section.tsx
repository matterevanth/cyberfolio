import type { Education } from '@/services/linkedin';
import EducationCard from './education-card';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap } from 'lucide-react';

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
        <GraduationCap className="h-5 w-5 text-primary" />
        <h2 className="text-xl font-semibold text-foreground tracking-tight">Education:</h2>
      </div>
      {/* Terminal card list style: reduced gap */}
      <div className="space-y-4">
        {sortedEducations.length > 0 ? (
          sortedEducations.map((edu, index) => (
            <EducationCard key={index} education={edu} />
          ))
        ) : (
          <p className="text-muted-foreground text-sm">// Education details loading...</p>
        )}
      </div>
    </div>
  );
}
