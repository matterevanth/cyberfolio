import type { Certification } from '@/services/linkedin';
import { BadgeCheck, ExternalLink, Award, Construction } from 'lucide-react'; // Added Construction icon for pursuing
import Link from 'next/link';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';

interface CertificationsSectionProps {
  certifications: Certification[];
}

export default function CertificationsSection({ certifications }: CertificationsSectionProps) {
  // Sort certifications: pursuing first, then alphabetically by name
  const sortedCertifications = certifications.sort((a, b) => {
    if (a.status === 'pursuing' && b.status !== 'pursuing') return -1;
    if (a.status !== 'pursuing' && b.status === 'pursuing') return 1;
    return a.name.localeCompare(b.name); // Alphabetical for same status
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-4">
         <span className="text-primary mr-1 font-mono">$</span> {/* Command prompt style */}
         <h2 className="text-xl font-semibold text-foreground tracking-tight flex items-center gap-2">
            <Award className="h-5 w-5 text-primary" /> {/* Changed icon */}
            Certifications:
        </h2>
      </div>
      {/* List layout for certifications */}
      <ul className="list-none space-y-3 pl-2"> {/* Changed grid to list */}
        {sortedCertifications.length > 0 ? (
          sortedCertifications.map((cert, index) => (
            <li
              key={index}
              className={cn(
                "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 text-sm", // Basic list item styling
                "animate-in fade-in slide-in-from-bottom-2 duration-300 ease-out" // Animation
              )}
              style={{ animationDelay: `${index * 75}ms`, animationFillMode: 'backwards' }}
            >
              {/* Certification Name, Organization, and Status */}
              <div className="flex items-center gap-1.5">
                {cert.status === 'pursuing' ? (
                  <Construction className="h-4 w-4 text-yellow-500 flex-shrink-0" title="Pursuing" /> // Icon for pursuing
                ) : (
                  <BadgeCheck className="h-4 w-4 text-primary flex-shrink-0" /> // Icon for completed
                )}
                <span className={cn(
                    "text-foreground font-medium",
                    cert.status === 'pursuing' && "italic text-yellow-500/90" // Style for pursuing
                )}>
                  {cert.name}
                </span>
                <span className="text-muted-foreground text-xs">({cert.organization})</span>
                 {cert.status === 'pursuing' && (
                    <span className="ml-1 text-xs text-yellow-600">(Pursuing)</span>
                 )}
              </div>

              {/* Optional Link */}
              {cert.url && cert.status !== 'pursuing' && (
                <Button asChild variant="ghost" size="sm" className="button-terminal-ghost text-xs px-2 py-0.5 h-auto self-start sm:self-center mt-1 sm:mt-0">
                  <Link href={cert.url} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="mr-1 h-3 w-3" /> Verify Credential
                  </Link>
                </Button>
              )}
            </li>
          ))
        ) : (
          <p className="text-muted-foreground text-sm pl-2">// No certifications listed.</p>
        )}
      </ul>
    </div>
  );
}
