import type { Experience } from '@/services/linkedin';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarDays, Building } from 'lucide-react'; // Added Building icon

interface ExperienceCardProps {
  experience: Experience;
}

export default function ExperienceCard({ experience }: ExperienceCardProps) {
  const formatDate = (dateString?: string): string => {
    if (!dateString) return 'Present';
    try {
      // Handle YYYY-MM and YYYY-MM-DD
      const date = new Date(dateString.includes('-') ? `${dateString}-02` : dateString); // Add day if missing for parsing
      if (isNaN(date.getTime())) return dateString; // Invalid date check
      return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
    } catch (e) {
      return dateString; // Return original string if parsing fails
    }
  };

  const startDateFormatted = formatDate(experience.startDate);
  const endDateFormatted = formatDate(experience.endDate);

  return (
    // Removed border-l, added subtle hover effect, using Card base styles for dark mode
    <Card className="bg-card border border-border/30 shadow-none transition-colors hover:bg-muted/30">
      <CardHeader className="pb-3 pt-4">
        <CardTitle className="text-lg font-semibold text-foreground">{experience.title}</CardTitle>
        <div className="flex items-center gap-2 text-sm text-primary pt-1">
            <Building className="h-4 w-4" />
            <span>{experience.company}</span>
        </div>
        <div className="flex items-center text-xs text-muted-foreground pt-2">
          <CalendarDays className="mr-1.5 h-3.5 w-3.5" />
          <span>{startDateFormatted} – {endDateFormatted}</span>
        </div>
      </CardHeader>
      <CardContent className="pb-4">
        <p className="text-sm text-foreground/80 leading-relaxed">{experience.description}</p>
      </CardContent>
    </Card>
  );
}
