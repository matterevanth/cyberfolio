import { Github, Linkedin } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const linkedinUrl = "https://www.linkedin.com/in/revanth-matte/";
  const githubUrl = "https://github.com/matterevanth";

  return (
    // Terminal footer style: border top, solid background
    <footer className="border-t border-border/60 bg-background mt-16 md:mt-24">
      <div className="container mx-auto flex flex-col items-center justify-center py-6 px-4 md:flex-row md:justify-between md:px-8 lg:px-12">
        {/* Copyright Text */}
        <p className="text-center text-xs text-muted-foreground md:text-left mb-2 md:mb-0">
          &copy; {currentYear} Revanth Matte. All rights reserved.
        </p>

        {/* Social Icons */}
        <div className="flex items-center space-x-3">
          <Link href={linkedinUrl} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn Profile" className="text-muted-foreground hover:text-primary transition-colors">
            <Linkedin className="h-4 w-4" />
          </Link>
          <Link href={githubUrl} target="_blank" rel="noopener noreferrer" aria-label="GitHub Profile" className="text-muted-foreground hover:text-primary transition-colors">
            <Github className="h-4 w-4" />
          </Link>
        </div>

        {/* Build Info Text */}
        <p className="mt-2 text-center text-[10px] text-muted-foreground/60 md:mt-0 md:text-right">
          // Built with Next.js & ShadCN UI // Inspired by the command line
        </p>
      </div>
    </footer>
  );
}
