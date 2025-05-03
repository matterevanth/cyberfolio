import type { Education } from '@/services/linkedin';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarDays, School } from 'lucide-react'; // Added School icon

interface EducationCardProps {
  education: Education;
}

export default function EducationCard({ education }: EducationCardProps) {
 const formatDate = (dateString?: string): string => {
    if (!dateString) return 'N/A';
    try {
      // Handle YYYY, YYYY-MM, YYYY-MM-DD formats
      const yearOnlyMatch = dateString.match(/^(\d{4})$/);
      if (yearOnlyMatch) return yearOnlyMatch[1];

      const date = new Date(dateString.includes('-') ? `${dateString}-02` : dateString); // Add day if missing for parsing
      if (isNaN(date.getTime())) return dateString; // Invalid date check
      return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
    } catch (e) {
      return dateString; // Return original string if parsing fails
    }
  };

  const startDateFormatted = formatDate(education.startDate);
  const endDateFormatted = formatDate(education.endDate);


  return (
    // Removed border-l, added subtle hover effect, use base card styles for dark mode
    // Added pb-4 to CardHeader since CardContent is removed
    <Card className="bg-card border border-border/30 shadow-none transition-colors hover:bg-muted/30">
      <CardHeader className="pb-4 pt-4">
        <CardTitle className="text-lg font-semibold text-foreground">{education.degree}</CardTitle> {/* Degree as Title */}
         <div className="flex items-center gap-2 text-sm text-primary pt-1">
             <School className="h-4 w-4" />
             <span>{education.school}</span>
         </div>
         <div className="flex items-center text-xs text-muted-foreground pt-2">
          <CalendarDays className="mr-1.5 h-3.5 w-3.5" />
          <span>{startDateFormatted} – {endDateFormatted}</span>
        </div>
      </CardHeader>
      {/* Removed CardContent which previously held the description */}
    </Card>
  );
}
