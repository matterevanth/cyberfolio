import type { Education } from '@/services/linkedin';
// Removed unused Card imports
import { CalendarDays, School } from 'lucide-react'; // Added School icon

interface EducationCardProps {
  education: Education;
}

export default function EducationCard({ education }: EducationCardProps) {
 const formatDate = (dateString?: string): string => {
    if (!dateString) return 'N/A';
    try {
      // Handle YYYY format
      const yearOnlyMatch = dateString.match(/^(\d{4})$/);
      if (yearOnlyMatch) return yearOnlyMatch[1];

      // Handle YYYY-MM format
       const ymMatch = dateString.match(/^(\d{4})-(\d{2})$/);
       if (ymMatch) {
           const year = parseInt(ymMatch[1], 10);
           const month = parseInt(ymMatch[2], 10);
           // Simple month names for terminal look
           const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
           if (month >= 1 && month <= 12) {
               return `${months[month - 1]} ${year}`;
           }
       }
       // Fallback for other potential formats or invalid dates
       return dateString;

    } catch (e) {
      console.warn(`Could not format date: ${dateString}. Error: ${e}`);
      return dateString; // Return original string if parsing fails
    }
  };


  const startDateFormatted = formatDate(education.startDate);
  const endDateFormatted = formatDate(education.endDate);


  return (
    // Terminal card style: transparent bg, border, no shadow, no rounding
    // Added hover effect and transition
    <div className="bg-transparent border border-border/50 shadow-none rounded-none p-3 transition-all duration-200 ease-out hover:border-primary/70 hover:bg-muted/30">
        {/* Degree: Foreground color, slightly larger */}
        <h3 className="text-base font-semibold text-foreground mb-1">{education.degree}</h3>
         {/* School: Primary color */}
         <div className="flex items-center gap-1.5 text-sm text-primary mb-1.5">
             <School className="h-3.5 w-3.5" />
             <span>{education.school}</span>
         </div>
         {/* Date: Muted foreground, smaller */}
         <div className="flex items-center text-xs text-muted-foreground">
          <CalendarDays className="mr-1.5 h-3 w-3" />
          <span>{startDateFormatted} &ndash; {endDateFormatted}</span>
        </div>
    </div>
  );
}
