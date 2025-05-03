import { Github, Linkedin } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  const linkedinUrl = "https://www.linkedin.com/in/revanth-matte/";
  const githubUrl = "https://github.com/matterevanth";

  return (
    // Terminal footer style: border top, solid background
    <footer className="border-t border-border/60 bg-background mt-16 md:mt-24">
      <div className="container mx-auto flex flex-col items-center justify-center py-4 px-4 md:px-8 lg:px-12"> {/* Reduced padding */}

        {/* Social Icons Centered */}
        <div className="flex items-center space-x-4"> {/* Increased spacing */}
          <Link href={linkedinUrl} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn Profile" className="text-muted-foreground hover:text-primary transition-colors p-2 rounded-sm hover:bg-primary/10"> {/* Added padding and hover bg */}
            <Linkedin className="h-5 w-5" /> {/* Increased icon size */}
          </Link>
          <Link href={githubUrl} target="_blank" rel="noopener noreferrer" aria-label="GitHub Profile" className="text-muted-foreground hover:text-primary transition-colors p-2 rounded-sm hover:bg-primary/10"> {/* Added padding and hover bg */}
            <Github className="h-5 w-5" /> {/* Increased icon size */}
          </Link>
        </div>

        {/* Copyright and Build Info Removed */}
      </div>
    </footer>
  );
}
