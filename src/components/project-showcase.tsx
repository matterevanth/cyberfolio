import ProjectCard from './project-card';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Code, FolderGit2 } from 'lucide-react';

// Placeholder project data - replace with your actual projects
const projects = [
  {
    title: "Project Alpha",
    description: "An innovative web application built with Next.js and TypeScript, focusing on real-time collaboration.",
    imageUrl: "https://picsum.photos/seed/alpha/600/400",
    liveUrl: "#",
    githubUrl: "#",
    tags: ["Next.js", "TypeScript", "WebSockets"],
    aiHint: "abstract tech code"
  },
  {
    title: "Project Beta",
    description: "A mobile app developed using React Native, designed to track personal fitness goals and progress.",
    imageUrl: "https://picsum.photos/seed/beta/600/400",
    liveUrl: "#",
    githubUrl: "#",
    tags: ["React Native", "Mobile App", "Fitness"],
     aiHint: "mobile app interface"
  },
  {
    title: "Project Gamma",
    description: "A data analysis tool created with Python and Pandas, visualizing complex datasets for business intelligence.",
    imageUrl: "https://picsum.photos/seed/gamma/600/400",
    liveUrl: null, // No live demo for this one
    githubUrl: "#",
    tags: ["Python", "Pandas", "Data Visualization"],
    aiHint: "data chart graph"
  },
];

export default function ProjectShowcase() {
  return (
    <Card className="shadow-md transition-shadow hover:shadow-lg">
       <CardHeader className="flex flex-row items-center gap-3">
         <FolderGit2 className="h-6 w-6 text-primary" />
        <CardTitle className="text-xl font-semibold text-primary">Projects</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {projects.map((project, index) => (
          <ProjectCard key={index} project={project} />
        ))}
      </CardContent>
    </Card>
  );
}