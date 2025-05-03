import ProjectCard from './project-card';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Code, FolderGit2 } from 'lucide-react';

// Placeholder project data - replace with your actual projects
const projects = [
  {
    title: "Project Alpha",
    description: "An innovative web application built with Next.js and TypeScript, focusing on real-time collaboration features and performance optimization.",
    imageUrl: "https://picsum.photos/seed/alpha/600/400",
    liveUrl: "#",
    githubUrl: "#",
    tags: ["Next.js", "TypeScript", "WebSockets", "Tailwind CSS"],
    aiHint: "abstract tech code dark"
  },
  {
    title: "Project Beta",
    description: "A cross-platform mobile app using React Native for tracking personal fitness goals, featuring data sync and visualization.",
    imageUrl: "https://picsum.photos/seed/beta/600/400",
    liveUrl: "#",
    githubUrl: "#",
    tags: ["React Native", "iOS", "Android", "Firebase"],
     aiHint: "mobile app ui fitness dark"
  },
  {
    title: "Project Gamma",
    description: "A data analysis dashboard built with Python (Flask/Pandas) to visualize complex datasets for business intelligence insights.",
    imageUrl: "https://picsum.photos/seed/gamma/600/400",
    liveUrl: null, // No live demo for this one
    githubUrl: "#",
    tags: ["Python", "Flask", "Pandas", "Plotly"],
    aiHint: "data chart graph dark theme"
  },
   {
    title: "Project Delta",
    description: "An e-commerce platform backend developed with Node.js and Express, integrated with Stripe for payments.",
    imageUrl: "https://picsum.photos/seed/delta/600/400",
    liveUrl: "#",
    githubUrl: "#",
    tags: ["Node.js", "Express", "MongoDB", "Stripe API"],
    aiHint: "server code terminal dark"
  },
];

export default function ProjectShowcase() {
  return (
     // Removed card styling from the main container
    <div className="space-y-8">
       <div className="flex items-center gap-3 mb-6">
         <FolderGit2 className="h-6 w-6 text-primary" />
        <h2 className="text-2xl font-semibold text-foreground tracking-tight">Projects</h2>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {projects.map((project, index) => (
          <ProjectCard key={index} project={project} />
        ))}
      </div>
    </div>
  );
}
