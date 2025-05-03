import type { Experience } from '@/services/linkedin';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarDays, Building, Zap } from 'lucide-react';
import { Badge } from "@/components/ui/badge";

interface ExperienceCardProps {
  experience: Experience;
}

export default function ExperienceCard({ experience }: ExperienceCardProps) {
  const formatDate = (dateString?: string): string => {
    if (!dateString || dateString.toLowerCase() === 'present') return 'Present';
    try {
       // Handle YYYY-MM format directly
       const ymMatch = dateString.match(/^(\d{4})-(\d{2})$/);
       if (ymMatch) {
           const year = parseInt(ymMatch[1], 10);
           const month = parseInt(ymMatch[2], 10);
           const date = new Date(year, month - 1, 15); // Use 15th day to avoid timezone issues
           if (isNaN(date.getTime())) return dateString;
           return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
       }

       // Handle other potential formats (less likely with parser)
       const date = new Date(dateString);
       if (isNaN(date.getTime())) return dateString;
       return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });

    } catch (e) {
      console.warn(`Could not format date: ${dateString}. Error: ${e}`);
      return dateString; // Return original string if formatting fails
    }
  };


  const startDateFormatted = formatDate(experience.startDate);
  const endDateFormatted = formatDate(experience.endDate);

  // Split description into bullet points if it contains '•'
  const descriptionPoints = experience.description?.split('\n').map(line => line.trim()).filter(line => line.startsWith('•')).map(line => line.substring(1).trim()); // Extract text after '•'
  const hasBulletPoints = descriptionPoints && descriptionPoints.length > 0;


  return (
    // Removed hover effect, adjusted padding slightly for timeline view
    <Card className="bg-transparent border-none shadow-none w-full p-0 m-0">
      <CardHeader className="pb-2 pt-0 px-0"> {/* Reduced padding */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
           <CardTitle className="text-lg font-semibold text-foreground">{experience.title}</CardTitle>
           <div className="flex items-center text-xs text-muted-foreground pt-1 sm:pt-0 shrink-0">
             <CalendarDays className="mr-1.5 h-3.5 w-3.5 flex-shrink-0" />
             <span className="whitespace-nowrap">{startDateFormatted} – {endDateFormatted}</span>
           </div>
         </div>
          <div className="flex items-center gap-2 text-sm text-primary pt-1">
              <Building className="h-4 w-4" />
              <span>{experience.company}</span>
          </div>


        {experience.skills && experience.skills.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5 items-center text-xs text-muted-foreground">
             <Zap className="h-3.5 w-3.5 mr-1 text-primary/80" /> {/* Skills Icon */}
            {experience.skills.map((skill, index) => (
              <Badge key={index} variant="secondary" className="text-xs bg-muted/70 hover:bg-muted/90 text-muted-foreground px-1.5 py-0.5 font-normal">
                {skill}
              </Badge>
            ))}
          </div>
        )}
      </CardHeader>
      <CardContent className="pb-0 px-0 text-sm text-foreground/80 leading-relaxed"> {/* Reduced padding */}
         {hasBulletPoints ? (
           <ul className="list-none space-y-1.5 pl-1 mt-2"> {/* Use list for bullet points */}
             {descriptionPoints.map((point, index) => (
               <li key={index} className="flex items-start">
                 <span className="mr-2 mt-1 text-primary/80">&#8226;</span> {/* Manual bullet */}
                 <span>{point}</span>
               </li>
             ))}
           </ul>
         ) : (
            <p className="mt-2">{experience.description}</p> // Render as single paragraph if no bullets
         )}
      </CardContent>
    </Card>
  );
}
