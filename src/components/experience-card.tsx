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
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value={accordionValue} className="border-none p-0">
          <AccordionTrigger
            disabled={!experience.description} // Disable trigger if no description
            className={cn(
              "group flex w-full flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-1 text-left p-0",
              // Remove default hover effect, apply custom on hover/focus
              "hover:no-underline focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary/50 rounded-sm",
              // Remove default padding and chevron
              "py-0 [&>svg]:hidden",
               // Add cursor pointer only if there's content to show
              experience.description ? "cursor-pointer" : "cursor-default"
          )}>
            {/* Left Side: Title, Company, Skills */}
            <div className="flex-grow space-y-1.5 transition-colors duration-200 group-hover:text-primary/80">
                {/* Title with Chevron */}
                <div className="flex items-center">
                  <h3 className="text-base font-semibold text-foreground group-hover:text-primary transition-colors duration-200 mr-2">{experience.title}</h3>
                   {/* Chevron Icon for Accordion */}
                    {experience.description && (
                      <ChevronRight className="h-4 w-4 text-muted-foreground transition-transform duration-200 group-data-[state=open]:rotate-90 flex-shrink-0 group-hover:text-primary/80" />
                    )}
                </div>
                {/* Company */}
                 <div className="flex items-center gap-1.5 text-sm text-primary group-hover:text-primary/90 transition-colors duration-200">
                    <Building className="h-3.5 w-3.5" />
                    <span>{experience.company}</span>
                 </div>
                {/* Skills */}
                {experience.skills && experience.skills.length > 0 && (
                  <div className="flex flex-wrap gap-1 items-center text-xs text-muted-foreground pt-1">
                     <Zap className="h-3 w-3 mr-1 text-primary/80" /> {/* Skills Icon */}
                    {experience.skills.map((skill, skillIndex) => (
                      <Badge key={skillIndex} variant="secondary" className="badge-terminal text-[10px] leading-tight transition-all duration-150 hover:scale-105 hover:bg-primary/20">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                )}
            </div>

            {/* Right Side: Date (aligned baseline on sm+) */}
            <div className="flex items-center text-xs text-muted-foreground pt-1 sm:pt-0 shrink-0 self-start sm:self-baseline transition-colors duration-200 group-hover:text-foreground/80">
              <CalendarDays className="mr-1.5 h-3 w-3 flex-shrink-0" />
              <span className="whitespace-nowrap">{startDateFormatted} &ndash; {endDateFormatted}</span>
            </div>
          </AccordionTrigger>

          {/* Accordion Content for Responsibilities */}
          {experience.description && (
            <AccordionContent className="pb-2 px-0 text-sm text-foreground/80 leading-normal pt-2 pl-4 mt-1">
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
          )}
        </AccordionItem>
      </Accordion>
    </div>
  );
}
