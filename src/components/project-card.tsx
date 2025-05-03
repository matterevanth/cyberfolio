import Image from 'next/image';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Github, ExternalLink } from 'lucide-react';
import Link from 'next/link';

interface Project {
  title: string;
  description: string;
  imageUrl: string;
  liveUrl?: string | null;
  githubUrl?: string | null;
  tags?: string[];
  aiHint?: string;
}

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
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
        <h3 className="text-base font-semibold text-foreground mb-1.5">{project.title}</h3>
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
      {/* Card Content: Reduced padding, muted foreground */}
      <div className="flex-grow pb-3 px-3">
        <p className="text-xs text-muted-foreground leading-normal">{project.description}</p>
      </div>
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
