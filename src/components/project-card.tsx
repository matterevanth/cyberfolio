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
    <Card className="flex flex-col overflow-hidden transition-all hover:scale-[1.02] hover:shadow-xl duration-300 ease-in-out">
       <div className="relative h-48 w-full">
         <Image
           src={project.imageUrl}
           alt={`${project.title} screenshot`}
           layout="fill"
           objectFit="cover"
           data-ai-hint={project.aiHint || "project technology"}
           className="transition-opacity duration-300 group-hover:opacity-90"
         />
         <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
       </div>
      <CardHeader className="pb-3 pt-4">
        <CardTitle className="text-lg font-semibold">{project.title}</CardTitle>
         {project.tags && project.tags.length > 0 && (
          <div className="mt-1 flex flex-wrap gap-1">
            {project.tags.map((tag, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </CardHeader>
      <CardContent className="flex-grow pb-4">
        <CardDescription className="text-sm leading-relaxed">{project.description}</CardDescription>
      </CardContent>
      <CardFooter className="flex justify-end gap-2 pt-0 pb-4 px-4">
        {project.githubUrl && (
          <Button asChild variant="outline" size="sm">
            <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
              <Github className="mr-1.5 h-4 w-4" /> GitHub
            </Link>
          </Button>
        )}
        {project.liveUrl && (
          <Button asChild variant="default" size="sm" className="bg-accent text-accent-foreground hover:bg-accent/90">
             <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer">
               <ExternalLink className="mr-1.5 h-4 w-4" /> Live Demo
             </Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}