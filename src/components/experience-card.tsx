import type { Experience } from '@/services/linkedin';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarDays, Building, Zap } from 'lucide-react'; // Added Building icon and Zap for skills
import { Badge } from "@/components/ui/badge"; // Import Badge

interface ExperienceCardProps {
  experience: Experience;
}

export default function ExperienceCard({ experience }: ExperienceCardProps) {
  const formatDate = (dateString?: string): string => {
    if (!dateString || dateString.toLowerCase() === 'present') return 'Present';
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

  // Split description into bullet points if it contains '•'
  const descriptionPoints = experience.description?.split('\n').filter(line => line.trim().startsWith('•')).map(line => line.trim().substring(2).trim()); // Extract text after '•'
  const hasBulletPoints = descriptionPoints && descriptionPoints.length > 0;

  return (
    <Card className="bg-card border border-border/30 shadow-none transition-colors hover:bg-muted/30 w-full">
      <CardHeader className="pb-3 pt-4">
        <CardTitle className="text-lg font-semibold text-foreground">{experience.title}</CardTitle>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 pt-1">
          <div className="flex items-center gap-2 text-sm text-primary">
              <Building className="h-4 w-4" />
              <span>{experience.company}</span>
          </div>
          <div className="flex items-center text-xs text-muted-foreground pt-1 sm:pt-0">
             <CalendarDays className="mr-1.5 h-3.5 w-3.5 flex-shrink-0" />
             <span className="whitespace-nowrap">{startDateFormatted} – {endDateFormatted}</span>
          </div>
        </div>

        {experience.skills && experience.skills.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1.5 items-center text-xs text-muted-foreground">
             <Zap className="h-3.5 w-3.5 mr-1 text-primary/80" /> {/* Skills Icon */}
            {experience.skills.map((skill, index) => (
              <Badge key={index} variant="secondary" className="text-xs bg-muted/70 hover:bg-muted/90 text-muted-foreground px-1.5 py-0.5">
                {skill}
              </Badge>
            ))}
          </div>
        )}
      </CardHeader>
      <CardContent className="pb-4 text-sm text-foreground/80 leading-relaxed">
         {hasBulletPoints ? (
           <ul className="list-none space-y-2 pl-1"> {/* Use list for bullet points */}
             {descriptionPoints.map((point, index) => (
               <li key={index} className="flex items-start">
                 <span className="mr-2 text-primary/80">&#8226;</span> {/* Manual bullet */}
                 <span>{point}</span>
               </li>
             ))}
           </ul>
         ) : (
            <p>{experience.description}</p> // Render as single paragraph if no bullets
         )}
      </CardContent>
    </Card>
  );
}
