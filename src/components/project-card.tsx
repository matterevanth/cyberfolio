import Image from 'next/image';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Github, ExternalLink, CalendarDays, ChevronRight } from 'lucide-react'; // Added CalendarDays and ChevronRight
import Link from 'next/link';
import type { Project } from '@/services/linkedin'; // Import Project type
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"; // Import Accordion
import { cn } from '@/lib/utils';

interface ProjectCardProps {
  project: Project;
  index: number; // Added index for unique accordion item value
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  // Split description into bullet points if it contains '•' or '\n•'
  const descriptionPoints = project.description?.split(/\n?•\s?/).map(line => line.trim()).filter(line => line);
  const hasBulletPoints = descriptionPoints && descriptionPoints.length > 0 && project.description?.includes('•');
  const accordionValue = `project-item-${index}`; // Unique value for each accordion item

  return (
    // Terminal card style: remove rounding, shadow; add border; no hover effect
    <div className="flex flex-col overflow-hidden bg-card border border-border/50 shadow-none rounded-none">
       {/* Image container */}
       <div className="relative h-40 w-full group"> {/* Reduced height */}
         <Image
           src={project.imageUrl}
           alt={`${project.title} screenshot`}
           layout="fill"
           objectFit="cover"
           data-ai-hint={project.aiHint || "project technology dark"}
           className="opacity-80" // Slightly dimmed image
         />
       </div>
      {/* Card Header: Reduced padding */}
      <div className="pb-2 pt-3 px-3">
        {/* Title: Foreground color, slightly smaller */}
        <h3 className="text-base font-semibold text-foreground mb-1">{project.title}</h3>
        {/* Date: Muted foreground, smaller */}
        {project.date && (
             <div className="flex items-center text-xs text-muted-foreground mb-1.5">
                <CalendarDays className="mr-1.5 h-3 w-3" />
                <span>{project.date}</span>
            </div>
        )}
         {project.tags && project.tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {project.tags.map((tag, index) => (
              // Terminal badge style
              <Badge key={index} variant="secondary" className="badge-terminal text-[10px] leading-tight">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </div>

      {/* Accordion for Description */}
       {project.description && (
           <Accordion type="single" collapsible className="w-full px-3 pb-2">
             <AccordionItem value={accordionValue} className="border-none p-0">
               <AccordionTrigger className={cn(
                   "flex items-center justify-start text-xs text-muted-foreground hover:text-foreground hover:no-underline p-0 py-1",
                   // Remove default chevron and padding
                   "[&>svg]:hidden"
               )}>
                 <ChevronRight className="h-3 w-3 mr-1.5 transition-transform duration-200 group-data-[state=open]:rotate-90" />
                 <span>Description</span>
               </AccordionTrigger>
               <AccordionContent className="pb-0 px-0 text-xs text-foreground/80 leading-normal pt-2 pl-4">
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
                    <p className="mt-1 text-muted-foreground">{project.description}</p>
                 )}
               </AccordionContent>
             </AccordionItem>
           </Accordion>
       )}


      {/* Card Footer: Apply terminal button styles */}
      <div className="flex justify-end gap-2 pt-1 pb-3 px-3 border-t border-border/30 mt-auto">
        {project.githubUrl && (
          // Terminal ghost button style
          <Button asChild variant="ghost" size="sm" className="button-terminal-ghost text-xs px-2 py-1 h-auto">
            <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
              <Github className="mr-1 h-3.5 w-3.5" /> Code
            </Link>
          </Button>
        )}
        {project.liveUrl && (
           // Terminal accent button style
          <Button asChild variant="outline" size="sm" className="button-terminal-accent text-xs px-2 py-1 h-auto">
             <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer">
               <ExternalLink className="mr-1 h-3.5 w-3.5" /> Demo
             </Link>
          </Button>
        )}
      </div>
    </div>
  );
}
