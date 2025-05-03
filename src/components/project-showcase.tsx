import ProjectCard from './project-card';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Code, FolderGit2 } from 'lucide-react';

// Placeholder project data - replace with Revanth Matte's actual projects
const projects = [
  {
    title: "Portfolio Website",
    description: "This personal portfolio website, built with Next.js, Tailwind CSS, and ShadCN UI, showcasing skills, experience, and projects.",
    imageUrl: "https://picsum.photos/seed/portfolio/600/400",
    liveUrl: "#", // Add live URL if deployed
    githubUrl: "https://github.com/revanthmatte/portfolio", // Replace with actual repo
    tags: ["Next.js", "React", "Tailwind CSS", "ShadCN UI", "TypeScript"],
    aiHint: "website portfolio dark theme screenshot"
  },
  {
    title: "Cloud Cost Optimizer",
    description: "A Python tool using AWS SDK (Boto3) to analyze EC2 instance usage and recommend cost-saving strategies like instance resizing or scheduling.",
    imageUrl: "https://picsum.photos/seed/cloudcost/600/400",
    liveUrl: null,
    githubUrl: "https://github.com/revanthmatte/cloud-optimizer", // Replace with actual repo
    tags: ["Python", "AWS", "Boto3", "Cost Optimization", "CLI"],
     aiHint: "cloud dashboard graph dark theme"
  },
  {
    title: "Real-time Chat Application",
    description: "A web application enabling real-time communication using WebSockets, built with Node.js, Express, and Socket.IO on the backend and React on the frontend.",
    imageUrl: "https://picsum.photos/seed/chat-app/600/400",
    liveUrl: "#", // Add live URL if deployed
    githubUrl: "https://github.com/revanthmatte/realtime-chat", // Replace with actual repo
    tags: ["Node.js", "Express", "React", "WebSockets", "Socket.IO"],
    aiHint: "chat application interface dark mode"
  },
   {
    title: "E-commerce API",
    description: "A RESTful API backend for an e-commerce platform using Django REST Framework, featuring product management, user authentication, and order processing.",
    imageUrl: "https://picsum.photos/seed/ecommerce-api/600/400",
    liveUrl: null,
    githubUrl: "https://github.com/revanthmatte/ecommerce-api", // Replace with actual repo
    tags: ["Python", "Django", "Django REST Framework", "PostgreSQL", "API"],
    aiHint: "api code documentation dark theme"
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
       <p className="text-sm text-muted-foreground text-center mt-4">
         More projects available on GitHub.
       </p>
    </div>
  );
}
