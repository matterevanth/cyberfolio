import type { Certification } from '@/services/linkedin';
import { BadgeCheck, ExternalLink, Award } from 'lucide-react'; // Added Award icon
import Link from 'next/link';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';

interface CertificationsSectionProps {
  certifications: Certification[];
}

export default function CertificationsSection({ certifications }: CertificationsSectionProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-4">
         <span className="text-primary mr-1 font-mono">$</span> {/* Command prompt style */}
         <h2 className="text-xl font-semibold text-foreground tracking-tight flex items-center gap-2">
            <Award className="h-5 w-5 text-primary" /> {/* Changed icon */}
            Certifications:
        </h2>
      </div>
      {/* Grid layout for certifications */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {certifications.length > 0 ? (
          certifications.map((cert, index) => (
            <div
              key={index}
              className={cn(
                  "flex flex-col justify-between bg-card border border-border/50 p-3 rounded-none shadow-md hover:shadow-primary/10 transition-shadow duration-200",
                  "animate-in fade-in slide-in-from-bottom-3 duration-500 ease-out"
              )}
              style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'backwards' }}
            >
               {/* Certification Name & Organization */}
              <div>
                 <div className="flex items-center gap-1.5 mb-1">
                    <BadgeCheck className="h-4 w-4 text-primary flex-shrink-0" />
                    <span className="text-sm text-foreground font-medium">{cert.name}</span>
                 </div>
                 <p className="text-xs text-muted-foreground pl-5.5 mb-2">{cert.organization}</p> {/* Indent org */}
              </div>

               {/* Optional Link */}
               {cert.url && (
                  <Button asChild variant="ghost" size="sm" className="button-terminal-ghost text-xs px-2 py-0.5 h-auto self-start mt-auto">
                     <Link href={cert.url} target="_blank" rel="noopener noreferrer">
                       <ExternalLink className="mr-1 h-3 w-3" /> Verify Credential
                     </Link>
                  </Button>
               )}
            </div>
          ))
        ) : (
          <p className="text-muted-foreground text-sm pl-2 col-span-1 sm:col-span-2">// No certifications listed.</p>
        )}
      </div>
    </div>
  );
}
