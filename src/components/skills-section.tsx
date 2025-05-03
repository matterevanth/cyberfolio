import type { Skills } from '@/services/linkedin';
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Wrench, ShieldCheck, Code, Cloud, Terminal, Languages, Cog /*Fallback*/ } from 'lucide-react'; // Added more relevant icons
import React from 'react';

interface SkillsSectionProps {
  skills: Skills;
}

// Helper function to get icon based on category name
const getCategoryIcon = (categoryName: string): React.ReactNode => {
  switch (categoryName) {
    case 'Tools': return <Wrench className="h-5 w-5 text-primary/90" />;
    case 'Frameworks': return <ShieldCheck className="h-5 w-5 text-primary/90" />;
    case 'CodeAnalysis': return <Code className="h-5 w-5 text-primary/90" />;
    case 'Cloud': return <Cloud className="h-5 w-5 text-primary/90" />;
    case 'OperatingSystems': return <Terminal className="h-5 w-5 text-primary/90" />;
    case 'Programming': return <Languages className="h-5 w-5 text-primary/90" />;
    default: return <Cog className="h-5 w-5 text-primary/90" />; // Fallback icon
  }
};

// Map internal keys to user-friendly display names
const categoryDisplayNames: { [key in keyof Skills]: string } = {
  Tools: "Security & Development Tools",
  Frameworks: "Frameworks & Standards",
  CodeAnalysis: "Code Analysis & Review",
  Cloud: "Cloud Platforms",
  OperatingSystems: "Operating Systems",
  Programming: "Programming & Scripting"
};


export default function SkillsSection({ skills }: SkillsSectionProps) {
  const skillCategories = Object.entries(skills) as [keyof Skills, string[]][];

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3 mb-6">
        <Cog className="h-6 w-6 text-primary" /> {/* Section Icon */}
        <h2 className="text-2xl font-semibold text-foreground tracking-tight">Skills & Expertise</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {skillCategories.map(([categoryKey, skillList]) => (
          skillList && skillList.length > 0 && (
            <Card key={categoryKey} className="bg-card border border-border/30 shadow-none transition-colors hover:bg-muted/30 flex flex-col">
              <CardHeader className="flex flex-row items-center justify-start space-x-3 pb-3 pt-4">
                {getCategoryIcon(categoryKey)}
                <CardTitle className="text-base font-medium text-foreground">{categoryDisplayNames[categoryKey]}</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-2 pt-0 flex-grow">
                {skillList.map((skill, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="text-xs bg-muted hover:bg-muted/80 text-muted-foreground whitespace-nowrap font-normal"
                  >
                    {skill}
                  </Badge>
                ))}
              </CardContent>
            </Card>
          )
        ))}
      </div>
    </div>
  );
}
