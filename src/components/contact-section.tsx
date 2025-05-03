import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail, Phone, FileText } from 'lucide-react'; // Added FileText for Resume
import Link from 'next/link';

export default function ContactSection() {
  // Replace with your actual contact details and resume link
  const contact = {
    email: "revanth.matte@example.com",
    linkedin: "https://www.linkedin.com/in/revanth-matte/",
    github: "https://github.com/yourusername",
    resumeUrl: "/resume.pdf", // Link to your resume PDF
  };

  return (
     // Removed card styling for a cleaner integration
    <div className="space-y-8">
       <div className="flex items-center gap-3 mb-6">
         <Mail className="h-6 w-6 text-primary" />
         <h2 className="text-2xl font-semibold text-foreground tracking-tight">Get In Touch</h2>
       </div>
      <div className="space-y-4">
          <p className="text-muted-foreground">
            Feel free to reach out if you'd like to collaborate or just chat!
          </p>
         <div className="flex flex-wrap gap-4 pt-4">
             <Button asChild variant="outline" className="border-border/50 hover:bg-muted/30 hover:text-foreground">
                <a href={`mailto:${contact.email}`} target="_blank" rel="noopener noreferrer">
                  <Mail className="mr-2 h-4 w-4" /> Email
                </a>
             </Button>
             <Button asChild variant="outline" className="border-border/50 hover:bg-muted/30 hover:text-foreground">
               <Link href={contact.linkedin} target="_blank" rel="noopener noreferrer">
                 <Linkedin className="mr-2 h-4 w-4" /> LinkedIn
               </Link>
             </Button>
             <Button asChild variant="outline" className="border-border/50 hover:bg-muted/30 hover:text-foreground">
                <Link href={contact.github} target="_blank" rel="noopener noreferrer">
                  <Github className="mr-2 h-4 w-4" /> GitHub
                </Link>
              </Button>
             {contact.resumeUrl && (
              <Button asChild variant="outline" className="border-border/50 hover:bg-muted/30 hover:text-foreground">
                 <Link href={contact.resumeUrl} target="_blank" rel="noopener noreferrer" download>
                   <FileText className="mr-2 h-4 w-4" /> Resume
                 </Link>
              </Button>
             )}
          </div>
      </div>
    </div>
  );
}
