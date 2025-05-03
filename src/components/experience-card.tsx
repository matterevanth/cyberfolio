'use client'; // Add this directive

import * as React from 'react';
import type { Experience } from '@/services/linkedin';
import { CalendarDays, Building, Zap, ChevronDown, ChevronUp } from 'lucide-react'; // Added Chevrons
import { Badge } from "@/components/ui/badge";
import { cn } from '@/lib/utils';

interface ExperienceCardProps {
  experience: Experience;
  align: 'left' | 'right'; // To help with text alignment on alternating sides
}

export default function ExperienceCard({ experience, align }: ExperienceCardProps) {
  const [isExpanded, setIsExpanded] = React.useState(false); // State for description visibility

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

  const hasDescription = experience.description && (hasBulletPoints || experience.description.trim().length > 0);

  return (
    // Card styling based on the image: dark background, subtle border
    // Added cursor-pointer if description exists, adjust padding based on expansion
    <div
      className={cn(
        "bg-card border border-border/30 shadow-md rounded-md transition-all duration-300 hover:shadow-primary/20 hover:border-primary/50",
        "p-4", // Base padding
        hasDescription && "cursor-pointer" // Add pointer cursor if expandable
      )}
      onClick={hasDescription ? () => setIsExpanded(!isExpanded) : undefined} // Toggle on click if description exists
      role={hasDescription ? "button" : undefined}
      tabIndex={hasDescription ? 0 : undefined}
      aria-expanded={hasDescription ? isExpanded : undefined}
    >
        {/* Header Part (Always Visible) */}
        <div className={cn(
             "flex flex-col",
             // Align header content based on the align prop
             align === 'right' ? 'md:items-end' : 'md:items-start'
        )}>
            {/* Date: Accent color */}
            <div className={cn(
                "flex items-center text-xs text-accent mb-1"
                // Justification handled by parent div alignment
            )}>
                <CalendarDays className="mr-1.5 h-3 w-3 flex-shrink-0" />
                <span className="whitespace-nowrap">{startDateFormatted} &ndash; {endDateFormatted}</span>
            </div>

            {/* Title and Company Container */}
            <div className={cn(
                "flex flex-col mb-2" // Add bottom margin
                // Alignment handled by parent div alignment
            )}>
                {/* Title: Foreground color */}
                <h3 className="text-base font-semibold text-foreground">{experience.title}</h3>
                 {/* Company: Primary color */}
                 <div className={cn(
                     "flex items-center gap-1.5 text-sm text-primary"
                      // Justification handled by parent div alignment
                 )}>
                    <Building className="h-3.5 w-3.5" />
                    <span>{experience.company}</span>
                 </div>
            </div>

            {/* Chevron indicator if description exists */}
            {hasDescription && (
                <div className={cn(
                     "flex items-center text-muted-foreground mt-1"
                     // Justification handled by parent div alignment
                 )}>
                    {isExpanded ? <ChevronUp className="h-4 w-4 mr-1" /> : <ChevronDown className="h-4 w-4 mr-1" />}
                    <span className="text-xs">{isExpanded ? 'Hide Details' : 'Show Details'}</span>
                </div>
            )}
        </div>

       {/* Description (Conditionally Rendered) */}
       {hasDescription && isExpanded && (
            <div className={cn(
                "text-sm text-muted-foreground leading-relaxed space-y-1.5 mt-3 pt-3 border-t border-border/30",
                // Force description text to always align left
                 "text-left"
            )}>
              {hasBulletPoints ? (
                 // Terminal list style: '>' prefix, muted foreground
                <ul className={cn(
                    "list-none space-y-1.5 pl-0" // Ensure no extra padding
                )}>
                   {descriptionPoints.map((point, pointIndex) => (
                    <li key={pointIndex} className={cn(
                        "flex items-start justify-start flex-row" // Force left alignment and row layout
                         )}>
                      <span className={cn("text-accent/80 mr-1.5")}>•</span> {/* Use bullet point, always on left */}
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

        {/* Skills (Optional: If we want to show them below description, only when expanded) */}
        {experience.skills && experience.skills.length > 0 && isExpanded && (
          <div className={cn(
              "flex flex-wrap gap-1 items-center text-xs text-muted-foreground pt-3 mt-3 border-t border-border/30",
               // Align skills based on the align prop
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
