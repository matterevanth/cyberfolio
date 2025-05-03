import type { Experience } from '@/services/linkedin';
import ExperienceCard from './experience-card';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase } from 'lucide-react';

interface ExperienceSectionProps {
  experiences: Experience[];
}

export default function ExperienceSection({ experiences }: ExperienceSectionProps) {
  return (
    <Card className="shadow-md transition-shadow hover:shadow-lg">
      <CardHeader className="flex flex-row items-center gap-3">
         <Briefcase className="h-6 w-6 text-primary" />
        <CardTitle className="text-xl font-semibold text-primary">Experience</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {experiences.length > 0 ? (
          experiences.map((exp, index) => (
            <ExperienceCard key={index} experience={exp} />
          ))
        ) : (
          <p className="text-muted-foreground">No experience information available.</p>
        )}
      </CardContent>
    </Card>
  );
}