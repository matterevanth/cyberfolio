import ProjectCard from './project-card';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Code, FolderGit2 } from 'lucide-react';

// Placeholder project data - replace/refine with Revanth Matte's actual projects, derived from resume context
const projects = [
  {
    title: "Vulnerability Scanner Automation",
    description: "Developed Python scripts to automate the validation of common OWASP vulnerabilities (e.g., SQLi, XSS) identified by scanners like Nessus and OWASP ZAP, streamlining the verification process and reducing manual effort.",
    imageUrl: "https://picsum.photos/seed/vuln-scanner/600/400",
    liveUrl: null, // Typically no live demo for internal tools
    githubUrl: null, // Assume private repo or conceptual project
    tags: ["Python", "Automation", "Security Testing", "OWASP", "Scripting"],
    aiHint: "python code terminal security dark theme"
  },
  {
    title: "Secure API Development Guide",
    description: "Collaborated on defining secure coding baselines and contributed to documentation outlining best practices for developing secure REST APIs, focusing on authentication, authorization, and input validation.",
    imageUrl: "https://picsum.photos/seed/api-guide/600/400",
    liveUrl: null,
    githubUrl: null, // Likely internal documentation
    tags: ["API Security", "Secure Coding", "Documentation", "REST", "Best Practices"],
     aiHint: "documentation website api security dark mode"
  },
  {
    title: "Portfolio Website (This Site)",
    description: "Personal portfolio website built with Next.js, Tailwind CSS, and ShadCN UI to showcase skills, experience, and projects in software development and cybersecurity.",
    imageUrl: "https://picsum.photos/seed/portfolio-site/600/400",
    liveUrl: "#", // Replace with actual URL if deployed
    githubUrl: "https://github.com/revanthmatte/portfolio", // Replace if needed
    tags: ["Next.js", "React", "Tailwind CSS", "ShadCN UI", "TypeScript", "Portfolio"],
    aiHint: "website portfolio dark theme browser screenshot"
  },
   {
    title: "Network Traffic Anomaly Detection",
    description: "Utilized Snort IDS and Wireshark during an internship to monitor network traffic, analyze logs, and identify potential application-layer attacks or anomalies, contributing to threat detection efforts.",
    imageUrl: "https://picsum.photos/seed/ids-project/600/400",
    liveUrl: null,
    githubUrl: null, // Likely internship project/work
    tags: ["Snort", "Wireshark", "IDS", "Network Security", "Log Analysis", "Threat Detection"],
    aiHint: "network graph security dashboard dark theme"
  },
];

export default function ProjectShowcase() {
  return (
    <div className="space-y-6"> {/* Reduced spacing */}
       <div className="flex items-center gap-2 mb-4"> {/* Reduced spacing */}
         <FolderGit2 className="h-5 w-5 text-primary" />
        <h2 className="text-xl font-semibold text-foreground tracking-tight">Projects:</h2>
      </div>
      {/* Terminal grid style: reduced gap */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {projects.map((project, index) => (
          <ProjectCard key={index} project={project} />
        ))}
      </div>
       {/* Terminal style text */}
       <p className="text-xs text-muted-foreground text-center mt-4">
         // More project details available upon request.
       </p>
    </div>
  );
}
