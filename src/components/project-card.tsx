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
    // Use subtle card styles for dark mode, remove hover scale
    <Card className="flex flex-col overflow-hidden bg-card border border-border/30 shadow-none transition-colors duration-300 hover:bg-muted/30">
       <div className="relative h-48 w-full group"> {/* Added group class */}
         <Image
           src={project.imageUrl}
           alt={`${project.title} screenshot`}
           layout="fill"
           objectFit="cover"
           data-ai-hint={project.aiHint || "project technology dark"}
           className="transition-opacity duration-300 group-hover:opacity-80" // Slightly reduce opacity on hover
         />
         {/* Removed gradient overlay for a cleaner look */}
       </div>
      <CardHeader className="pb-3 pt-4 px-4">
        <CardTitle className="text-lg font-semibold text-foreground">{project.title}</CardTitle>
         {project.tags && project.tags.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1.5">
            {project.tags.map((tag, index) => (
              <Badge key={index} variant="secondary" className="text-xs bg-muted hover:bg-muted/80 text-muted-foreground">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </CardHeader>
      <CardContent className="flex-grow pb-4 px-4">
        <CardDescription className="text-sm text-foreground/80 leading-relaxed">{project.description}</CardDescription>
      </CardContent>
      <CardFooter className="flex justify-end gap-2 pt-2 pb-4 px-4">
        {project.githubUrl && (
          <Button asChild variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground hover:bg-muted">
            <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
              <Github className="mr-1.5 h-4 w-4" /> Code
            </Link>
          </Button>
        )}
        {project.liveUrl && (
          <Button asChild variant="ghost" size="sm" className="text-accent hover:text-accent-foreground hover:bg-accent/90">
             <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer">
               <ExternalLink className="mr-1.5 h-4 w-4" /> Demo
             </Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
