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
    const dateA = new Date(a.startDate);
    const dateB = new Date(b.startDate);
    return dateB.getTime() - dateA.getTime();
  });

  return (
     // Removed card styling from the main container
     <div className="space-y-8">
      <div className="flex items-center gap-3 mb-6">
        <GraduationCap className="h-6 w-6 text-primary" />
        <h2 className="text-2xl font-semibold text-foreground tracking-tight">Education</h2>
      </div>
      <div className="space-y-6">
        {sortedEducations.length > 0 ? (
          sortedEducations.map((edu, index) => (
            <EducationCard key={index} education={edu} />
          ))
        ) : (
          <p className="text-muted-foreground">Education details are currently being updated.</p>
        )}
      </div>
    </div>
  );
}
