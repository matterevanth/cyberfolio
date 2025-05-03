import type { Experience } from '@/services/linkedin';
import ExperienceCard from './experience-card';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase } from 'lucide-react';

interface ExperienceSectionProps {
  experiences: Experience[];
}

export default function ExperienceSection({ experiences }: ExperienceSectionProps) {
  return (
    // Removed card styling from the main container for a cleaner look
    <div className="space-y-8">
      <div className="flex items-center gap-3 mb-6">
         <Briefcase className="h-6 w-6 text-primary" />
        <h2 className="text-2xl font-semibold text-foreground tracking-tight">Experience</h2>
      </div>
      <div className="space-y-6">
        {experiences.length > 0 ? (
          experiences.map((exp, index) => (
            <ExperienceCard key={index} experience={exp} />
          ))
        ) : (
          <p className="text-muted-foreground">Experience information is currently being updated.</p>
        )}
      </div>
    </div>
  );
}
