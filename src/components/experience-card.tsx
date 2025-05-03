import type { Experience } from '@/services/linkedin';
import { CalendarDays, Building, Zap, ChevronRight } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { cn } from '@/lib/utils';

interface ExperienceCardProps {
  experience: Experience;
  index: number; // Add index for unique accordion item value
}

export default function ExperienceCard({ experience, index }: ExperienceCardProps) {
  const formatDate = (dateString?: string): string => {
    if (!dateString || dateString.toLowerCase() === 'present') return 'Present';
    try {
       // Handle YYYY-MM format directly
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
       // Fallback if format is unexpected
       return dateString;

    } catch (e) {
      console.warn(`Could not format date: ${dateString}. Error: ${e}`);
      return dateString; // Return original string if formatting fails
    }
  };


  const startDateFormatted = formatDate(experience.startDate);
  const endDateFormatted = formatDate(experience.endDate);

  // Split description into bullet points if it contains '•' or '\n•'
  const descriptionPoints = experience.description?.split(/\n?•\s?/).map(line => line.trim()).filter(line => line); // Handles both '•' and '\n•', trims, removes empty lines
  const hasBulletPoints = descriptionPoints && descriptionPoints.length > 0 && experience.description?.includes('•');

  const accordionValue = `item-${index}`; // Unique value for each accordion item

  return (
    // Terminal card style: transparent bg, no border/shadow, no padding
    <div className="bg-transparent border-none shadow-none w-full p-0 m-0">
      <div className="pb-1 pt-0 px-0"> {/* Header area */}
        <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-1">
           {/* Title: Foreground color */}
           <h3 className="text-base font-semibold text-foreground">{experience.title}</h3>
           {/* Date: Muted foreground, smaller */}
           <div className="flex items-center text-xs text-muted-foreground pt-0 sm:pt-0 shrink-0">
             <CalendarDays className="mr-1.5 h-3 w-3 flex-shrink-0" />
             <span className="whitespace-nowrap">{startDateFormatted} &ndash; {endDateFormatted}</span>
           </div>
         </div>
          {/* Company: Primary color, smaller */}
          <div className="flex items-center gap-1.5 text-sm text-primary mb-2">
              <Building className="h-3.5 w-3.5" />
              <span>{experience.company}</span>
          </div>

        {experience.skills && experience.skills.length > 0 && (
          <div className="mb-2 flex flex-wrap gap-1 items-center text-xs text-muted-foreground">
             <Zap className="h-3 w-3 mr-1 text-primary/80" /> {/* Skills Icon */}
            {experience.skills.map((skill, skillIndex) => (
              // Terminal badge style
              <Badge key={skillIndex} variant="secondary" className="badge-terminal text-[10px] leading-tight">
                {skill}
              </Badge>
            ))}
          </div>
        )}
      </div>

       {/* Accordion for Responsibilities */}
       {experience.description && (
           <Accordion type="single" collapsible className="w-full">
             <AccordionItem value={accordionValue} className="border-none p-0">
               <AccordionTrigger className={cn(
                   "flex items-center justify-start text-xs text-muted-foreground hover:text-foreground hover:no-underline p-0 py-1",
                   // Remove default chevron and padding
                   "[&>svg]:hidden"
               )}>
                 <ChevronRight className="h-3 w-3 mr-1.5 transition-transform duration-200 group-data-[state=open]:rotate-90" />
                 <span>Responsibilities</span>
               </AccordionTrigger>
               <AccordionContent className="pb-0 px-0 text-sm text-foreground/80 leading-normal pt-2 pl-4">
                 {hasBulletPoints ? (
                   // Terminal list style: '>' prefix, muted foreground
                   <ul className="list-none space-y-1 pl-0 mt-1">
                     {descriptionPoints.map((point, pointIndex) => (
                       <li key={pointIndex} className="flex items-start">
                         <span className="mr-1.5 text-primary">{'>'}</span> {/* Terminal prompt style */}
                         <span className="text-muted-foreground">{point}</span>
                       </li>
                     ))}
                   </ul>
                 ) : (
                    // Single paragraph: muted foreground
                    <p className="mt-1 text-muted-foreground">{experience.description}</p>
                 )}
               </AccordionContent>
             </AccordionItem>
           </Accordion>
       )}

    </div>
  );
}
