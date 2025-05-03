import type { Experience } from '@/services/linkedin';
import { CalendarDays, Building, Zap } from 'lucide-react'; // Removed ChevronRight
import { Badge } from "@/components/ui/badge";
// Removed Accordion imports
import { cn } from '@/lib/utils';

interface ExperienceCardProps {
  experience: Experience;
  align: 'left' | 'right'; // To help with text alignment on alternating sides
}

export default function ExperienceCard({ experience, align }: ExperienceCardProps) {
  const formatDate = (dateString?: string): string => {
    if (!dateString || dateString.toLowerCase() === 'present') return 'Present';
    try {
       const ymMatch = dateString.match(/^(\d{4})-(\d{2})$/);
       if (ymMatch) {
           const year = parseInt(ymMatch[1], 10);
           const month = parseInt(ymMatch[2], 10);
           const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
           if (month >= 1 && month <= 12) {
               return `${months[month - 1]} ${year}`;
           }
       }
       return dateString;
    } catch (e) {
      console.warn(`Could not format date: ${dateString}. Error: ${e}`);
      return dateString;
    }
  };

  const startDateFormatted = formatDate(experience.startDate);
  const endDateFormatted = formatDate(experience.endDate);

  // Split description into bullet points
  const descriptionPoints = experience.description?.split(/\n?•\s?/).map(line => line.trim()).filter(line => line);
  const hasBulletPoints = descriptionPoints && descriptionPoints.length > 0 && experience.description?.includes('•');

  return (
    // Card styling based on the image: dark background, subtle border
    <div className={cn(
        "bg-card border border-border/30 shadow-md rounded-md p-4 transition-all duration-300 hover:shadow-primary/20 hover:border-primary/50",
        align === 'right' ? 'md:text-right' : 'md:text-left' // Adjust text alignment for alternating layout
    )}>
      {/* Date: Accent color */}
      <div className={cn(
          "flex items-center text-xs text-accent mb-1",
          align === 'right' ? 'md:justify-end' : 'md:justify-start'
      )}>
        <CalendarDays className="mr-1.5 h-3 w-3 flex-shrink-0" />
        <span className="whitespace-nowrap">{startDateFormatted} &ndash; {endDateFormatted}</span>
      </div>

       {/* Title: Foreground color */}
       <h3 className="text-base font-semibold text-foreground mb-1">{experience.title}</h3>

       {/* Company: Primary color (yellowish in image, using primary theme color) */}
       <div className={cn(
           "flex items-center gap-1.5 text-sm text-primary mb-3",
           align === 'right' ? 'md:justify-end' : 'md:justify-start'
       )}>
          <Building className="h-3.5 w-3.5" />
          <span>{experience.company}</span>
       </div>

       {/* Description */}
       {experience.description && (
            <div className={cn(
                "text-sm text-muted-foreground leading-relaxed space-y-1.5",
                align === 'right' ? 'md:text-right' : 'md:text-left' // Ensure description text aligns
            )}>
              {hasBulletPoints ? (
                 // Terminal list style: '>' prefix, muted foreground
                <ul className={cn("list-none space-y-1.5 pl-0", align === 'right' ? 'md:pr-4' : 'md:pl-4')}>
                   {descriptionPoints.map((point, pointIndex) => (
                    <li key={pointIndex} className={cn("flex items-start", align === 'right' ? 'md:justify-end md:flex-row-reverse' : '')}>
                      <span className={cn("text-accent/80", align === 'right' ? 'ml-1.5' : 'mr-1.5')}>•</span> {/* Use bullet point */}
                      <span>{point}</span>
                    </li>
                   ))}
                 </ul>
               ) : (
                   // Single paragraph
                   <p className="mt-1">{experience.description}</p>
               )}
             </div>
          )}

        {/* Skills (Optional: If we want to show them below description) */}
        {experience.skills && experience.skills.length > 0 && (
          <div className={cn(
              "flex flex-wrap gap-1 items-center text-xs text-muted-foreground pt-3 mt-3 border-t border-border/30",
              align === 'right' ? 'md:justify-end' : 'md:justify-start'
              )}>
             <Zap className="h-3 w-3 mr-1 text-primary/80" /> {/* Skills Icon */}
            {experience.skills.map((skill, skillIndex) => (
              <Badge key={skillIndex} variant="secondary" className="badge-terminal text-[10px] leading-tight">
                {skill}
              </Badge>
            ))}
          </div>
        )}
    </div>
  );
}
