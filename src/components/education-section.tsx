import type { Education } from '@/services/linkedin';
import EducationCard from './education-card';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap } from 'lucide-react';

interface EducationSectionProps {
  educations: Education[];
}

export default function EducationSection({ educations }: EducationSectionProps) {
  return (
    <Card className="shadow-md transition-shadow hover:shadow-lg">
      <CardHeader className="flex flex-row items-center gap-3">
        <GraduationCap className="h-6 w-6 text-primary" />
        <CardTitle className="text-xl font-semibold text-primary">Education</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {educations.length > 0 ? (
          educations.map((edu, index) => (
            <EducationCard key={index} education={edu} />
          ))
        ) : (
          <p className="text-muted-foreground">No education information available.</p>
        )}
      </CardContent>
    </Card>
  );
}