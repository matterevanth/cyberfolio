import type { Certification } from '@/services/linkedin';
import { BadgeCheck, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { Button } from './ui/button'; // Import Button for links if needed

interface CertificationsSectionProps {
  certifications: Certification[];
}

export default function CertificationsSection({ certifications }: CertificationsSectionProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-4">
        <BadgeCheck className="h-5 w-5 text-primary" />
        <h2 className="text-xl font-semibold text-foreground tracking-tight">Certifications:</h2>
      </div>
      {/* List for certifications */}
      <ul className="list-none space-y-3 pl-2"> {/* Use unordered list */}
        {certifications.length > 0 ? (
          certifications.map((cert, index) => (
            <li key={index} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 text-sm">
               {/* Certification Name & Organization */}
              <div className="flex items-center gap-1.5">
                 <span className="text-primary font-medium">{'>'}</span> {/* Terminal prompt style */}
                 <span className="text-foreground font-medium">{cert.name}</span>
                 <span className="text-muted-foreground text-xs">({cert.organization})</span>
              </div>
               {/* Optional Link */}
               {cert.url && (
                  <Button asChild variant="ghost" size="sm" className="button-terminal-ghost text-xs px-2 py-0 h-auto self-start sm:self-center mt-1 sm:mt-0">
                     <Link href={cert.url} target="_blank" rel="noopener noreferrer">
                       <ExternalLink className="mr-1 h-3 w-3" /> Verify
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

    