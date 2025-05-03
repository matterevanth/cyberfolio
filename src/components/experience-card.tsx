import type { Experience } from '@/services/linkedin';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarDays } from 'lucide-react';

interface ExperienceCardProps {
  experience: Experience;
}

export default function ExperienceCard({ experience }: ExperienceCardProps) {
  const formatDate = (dateString?: string): string => {
    if (!dateString) return 'Present';
    try {
      // Basic check if it's just year-month
      if (/^\d{4}-\d{2}$/.test(dateString)) {
        const [year, month] = dateString.split('-');
        return new Date(parseInt(year), parseInt(month) - 1).toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
      }
      // Assume full date if not year-month
      return new Date(dateString).toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
    } catch (e) {
      return dateString; // Return original string if parsing fails
    }
  };

  const startDateFormatted = formatDate(experience.startDate);
  const endDateFormatted = formatDate(experience.endDate);

  return (
    <Card className="border-l-4 border-primary bg-background transition-colors hover:bg-secondary/50">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold">{experience.title}</CardTitle>
        <CardDescription className="text-base text-primary">{experience.company}</CardDescription>
        <div className="flex items-center text-xs text-muted-foreground pt-1">
          <CalendarDays className="mr-1.5 h-3.5 w-3.5" />
          <span>{startDateFormatted} – {endDateFormatted}</span>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-foreground/90">{experience.description}</p>
      </CardContent>
    </Card>
  );
}