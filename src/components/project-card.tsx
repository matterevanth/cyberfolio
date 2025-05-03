import Image from 'next/image';
// Removed unused Card imports
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Github, ExternalLink, CalendarDays } from 'lucide-react'; // Removed ChevronRight
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

  const hasDescription = project.description && (hasBulletPoints || project.description.trim().length > 0);

  return (
    // Terminal card style: remove rounding, shadow; add border; add transition
    <div className="flex flex-col overflow-hidden bg-card border border-border/50 shadow-none rounded-none transition-all duration-300 ease-out hover:border-primary/50 hover:shadow-md hover:shadow-primary/10">
       {/* Image container - Added hover scale effect */}
       <div className="relative h-40 w-full group overflow-hidden"> {/* Reduced height, added overflow-hidden */}
         <Image
           src={project.imageUrl}
           alt={`${project.title} screenshot`}
           fill // Use fill instead of layout
           style={{ objectFit: 'cover' }} // Use style for objectFit
           sizes="(max-width: 640px) 100vw, 50vw" // Provide sizes prop for responsive images
           data-ai-hint={project.aiHint || "project technology dark"}
           className="opacity-80 transition-transform duration-300 ease-out group-hover:scale-105 group-hover:opacity-100" // Scale and brighten on hover
         />
       </div>

      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value={accordionValue} className="border-none p-0">
            {/* Card Header as Accordion Trigger */}
            <AccordionTrigger
                disabled={!hasDescription} // Disable trigger if no description
                className={cn(
                "group flex w-full flex-col items-start text-left p-3 pb-2",
                // Remove default hover effect, apply custom on hover/focus
                "hover:no-underline focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary/50 rounded-sm",
                // Remove default padding and HIDE the default chevron icon
                 "py-0 [&>svg]:hidden",
                 // Add cursor pointer only if there's content to show
                 hasDescription ? "cursor-pointer" : "cursor-default"
            )}>
                 {/* Title */}
                <div className="flex items-center w-full justify-between transition-colors duration-200 group-hover:text-primary/80">
                    <h3 className="text-base font-semibold text-foreground group-hover:text-primary transition-colors duration-200 mb-1 mr-2">{project.title}</h3>
                    {/* Removed custom ChevronRight icon here */}
                </div>
                {/* Date */}
                {project.date && (
                     <div className="flex items-center text-xs text-muted-foreground mb-1.5 transition-colors duration-200 group-hover:text-foreground/80">
                        <CalendarDays className="mr-1.5 h-3 w-3" />
                        <span>{project.date}</span>
                    </div>
                )}
                 {/* Tags */}
                 {project.tags && project.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {project.tags.map((tag, tagIndex) => (
                      // Terminal badge style
                      <Badge key={tagIndex} variant="secondary" className="badge-terminal text-[10px] leading-tight transition-all duration-150 hover:scale-105 hover:bg-primary/20">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}
            </AccordionTrigger>

           {/* Accordion Content for Description */}
           {hasDescription && (
               <AccordionContent className="pb-2 px-3 text-xs text-foreground/80 leading-normal pt-1 pl-7"> {/* Indent content slightly */}
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
           )}
        </AccordionItem>
      </Accordion>

      {/* Card Footer: Apply terminal button styles - Keep outside accordion */}
      <div className="flex justify-end gap-2 pt-2 pb-3 px-3 border-t border-border/30 mt-auto">
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