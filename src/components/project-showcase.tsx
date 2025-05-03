import ProjectCard from './project-card';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Code, FolderGit2 } from 'lucide-react';
import type { Project } from '@/services/linkedin'; // Import Project type

interface ProjectShowcaseProps {
  projects: Project[]; // Accept projects as props
}

export default function ProjectShowcase({ projects }: ProjectShowcaseProps) {
  // Sort projects by date, most recent first (assuming YYYY-MM or Month YYYY format)
  const sortedProjects = projects.sort((a, b) => {
    const parseProjectDate = (dateStr: string | undefined): Date => {
        if (!dateStr) return new Date(0); // Oldest date if undefined
        try {
            // Handle "Month YYYY" format
            const ymMatch = dateStr.match(/^(\w+)\s(\d{4})$/);
            if (ymMatch) {
                const monthMap: { [key: string]: number } = {
                    Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5,
                    Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11
                };
                 const monthIndex = monthMap[ymMatch[1]];
                 const year = parseInt(ymMatch[2], 10);
                 if (monthIndex !== undefined && !isNaN(year)) {
                    return new Date(year, monthIndex, 1); // Use day 1 for comparison
                 }
            }
            // Fallback or handle other formats if needed, default to epoch start on error
            return new Date(0);
        } catch {
            return new Date(0); // Fallback on any parsing error
        }
    };

    const dateA = parseProjectDate(a.date);
    const dateB = parseProjectDate(b.date);
    return dateB.getTime() - dateA.getTime(); // Most recent first
});


  return (
    <div className="space-y-6"> {/* Reduced spacing */}
       <div className="flex items-center gap-2 mb-4"> {/* Reduced spacing */}
         <FolderGit2 className="h-5 w-5 text-primary" />
        <h2 className="text-xl font-semibold text-foreground tracking-tight">Projects:</h2>
      </div>
      {/* Terminal grid style: reduced gap */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {sortedProjects.length > 0 ? (
             sortedProjects.map((project, index) => (
              <ProjectCard key={index} project={project} index={index} /> // Pass index here
            ))
        ) : (
             <p className="text-muted-foreground text-sm col-span-1 sm:col-span-2">// Project details loading or none available.</p>
        )}
      </div>
       {/* Terminal style text */}
       <p className="text-xs text-muted-foreground text-center mt-4">
         // More project details available upon request.
       </p>
    </div>
  );
}
