import type { Skills } from '@/services/linkedin';
import { Badge } from "@/components/ui/badge";
// Removed unused Card imports
import { Wrench, ShieldCheck, Code, Cloud, Terminal, Languages, Cog /*Fallback*/ } from 'lucide-react'; // Added more relevant icons
import React from 'react';
import { cn } from '@/lib/utils';

interface SkillsSectionProps {
  skills: Skills;
}

// Helper function to get icon based on category name
const getCategoryIcon = (categoryName: string): React.ReactNode => {
  // Use primary color for icons
  switch (categoryName) {
    case 'Tools': return <Wrench className="h-4 w-4 text-primary" />;
    case 'Frameworks': return <ShieldCheck className="h-4 w-4 text-primary" />;
    case 'CodeAnalysis': return <Code className="h-4 w-4 text-primary" />;
    case 'Cloud': return <Cloud className="h-4 w-4 text-primary" />;
    case 'OperatingSystems': return <Terminal className="h-4 w-4 text-primary" />;
    case 'Programming': return <Languages className="h-4 w-4 text-primary" />;
    default: return <Cog className="h-4 w-4 text-primary" />; // Fallback icon
  }
};

// Map internal keys to user-friendly display names
const categoryDisplayNames: { [key in keyof Skills]: string } = {
  Tools: "Tools", // Simplified names
  Frameworks: "Frameworks & Standards",
  CodeAnalysis: "Code Analysis",
  Cloud: "Cloud Platforms",
  OperatingSystems: "Operating Systems",
  Programming: "Programming/Scripting"
};


export default function SkillsSection({ skills }: SkillsSectionProps) {
  const skillCategories = Object.entries(skills) as [keyof Skills, string[]][];

  return (
    <div className="space-y-6"> {/* Reduced spacing */}
      <div className="flex items-center gap-2 mb-4"> {/* Reduced spacing */}
         <span className="text-primary mr-1 font-mono">$</span> {/* Command prompt style */}
         <h2 className="text-xl font-semibold text-foreground tracking-tight flex items-center gap-2">
            <Cog className="h-5 w-5 text-primary" /> {/* Section Icon */}
            Skills & Expertise:
        </h2>
      </div>
      {/* Grid for skills */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"> {/* Reduced gap */}
        {skillCategories.map(([categoryKey, skillList]) => (
          skillList && skillList.length > 0 && (
            // Terminal card style: no bg, border, no shadow, sharp corners
            // Added hover effect and transition
            <div key={categoryKey} className="border border-border/50 p-3 rounded-none transition-all duration-200 ease-out hover:border-primary/70 hover:bg-muted/30">
               <div className="flex items-center space-x-2 mb-2">
                  {getCategoryIcon(categoryKey)}
                  <h3 className="text-sm font-medium text-foreground">{categoryDisplayNames[categoryKey]}</h3>
               </div>
               <div className="flex flex-wrap gap-1.5">
                  {skillList.map((skill, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      // Terminal badge style
                      // Added hover effect
                      className="badge-terminal text-xs transition-all duration-150 hover:scale-105 hover:bg-primary/20"
                    >
                      {skill}
                    </Badge>
                  ))}
               </div>
            </div>
          )
        ))}
      </div>
    </div>
  );
}
