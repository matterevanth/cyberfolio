import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail, FileText } from 'lucide-react';
import Link from 'next/link';

export default function ContactSection() {
  // Replace with your actual contact details and resume link
  const contact = {
    email: "revanth.matte@example.com", // Placeholder Email
    linkedin: "https://www.linkedin.com/in/revanth-matte/", // Keep or update LinkedIn
    github: "https://github.com/revanthmatte", // Placeholder GitHub
    resumeUrl: "/revanth-matte-resume.pdf", // Placeholder link to your resume PDF in public folder
  };

  return (
     // Simplified div structure for horizontal layout, reduced spacing
    <div className="mt-6 mb-8">
      <div className="flex flex-wrap justify-start items-center gap-3">
         <Button asChild variant="outline" size="sm" className="border-border/50 hover:bg-muted/30 hover:text-foreground text-xs px-3 py-1 h-auto">
            <a href={`mailto:${contact.email}`} target="_blank" rel="noopener noreferrer">
              <Mail className="mr-1.5 h-3.5 w-3.5" /> Email
            </a>
         </Button>
         <Button asChild variant="outline" size="sm" className="border-border/50 hover:bg-muted/30 hover:text-foreground text-xs px-3 py-1 h-auto">
           <Link href={contact.linkedin} target="_blank" rel="noopener noreferrer">
             <Linkedin className="mr-1.5 h-3.5 w-3.5" /> LinkedIn
           </Link>
         </Button>
         <Button asChild variant="outline" size="sm" className="border-border/50 hover:bg-muted/30 hover:text-foreground text-xs px-3 py-1 h-auto">
            <Link href={contact.github} target="_blank" rel="noopener noreferrer">
              <Github className="mr-1.5 h-3.5 w-3.5" /> GitHub
            </Link>
          </Button>
         {contact.resumeUrl && (
          <Button asChild variant="outline" size="sm" className="border-border/50 hover:bg-muted/30 hover:text-foreground text-xs px-3 py-1 h-auto">
             {/* Make sure the resume PDF exists in the /public directory */}
             <Link href={contact.resumeUrl} target="_blank" rel="noopener noreferrer" download="Revanth_Matte_Resume.pdf">
               <FileText className="mr-1.5 h-3.5 w-3.5" /> Resume
             </Link>
          </Button>
         )}
      </div>
    </div>
  );
}
