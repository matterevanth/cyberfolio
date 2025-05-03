import type { Education } from '@/services/linkedin';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarDays } from 'lucide-react';

interface EducationCardProps {
  education: Education;
}

export default function EducationCard({ education }: EducationCardProps) {
 const formatDate = (dateString?: string): string => {
    if (!dateString) return 'N/A';
    try {
      // Basic check if it's just year-month
      if (/^\d{4}-\d{2}$/.test(dateString)) {
        const [year, month] = dateString.split('-');
        return new Date(parseInt(year), parseInt(month) - 1).toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
      }
      // Assume full date if not year-month
       if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
         return new Date(dateString).toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
       }
       // Handle just year
        if (/^\d{4}$/.test(dateString)) {
            return dateString;
        }

      return dateString; // Fallback for unexpected formats
    } catch (e) {
      return dateString; // Return original string if parsing fails
    }
  };

  const startDateFormatted = formatDate(education.startDate);
  const endDateFormatted = formatDate(education.endDate);


  return (
    <Card className="border-l-4 border-accent bg-background transition-colors hover:bg-secondary/50">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold">{education.school}</CardTitle>
        <CardDescription className="text-base text-primary">{education.degree}</CardDescription>
         <div className="flex items-center text-xs text-muted-foreground pt-1">
          <CalendarDays className="mr-1.5 h-3.5 w-3.5" />
          <span>{startDateFormatted} – {endDateFormatted}</span>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-foreground/90">{education.description}</p>
      </CardContent>
    </Card>
  );
}