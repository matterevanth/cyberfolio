import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail, Phone } from 'lucide-react';
import Link from 'next/link';

export default function ContactSection() {
  // Replace with your actual contact details
  const contact = {
    email: "revanth.matte@example.com", // Replace with your email
    phone: "+1 (555) 123-4567", // Replace with your phone or remove
    linkedin: "https://www.linkedin.com/in/revanth-matte/",
    github: "https://github.com/yourusername", // Replace with your GitHub profile URL
  };

  return (
    <Card className="shadow-md transition-shadow hover:shadow-lg">
      <CardHeader className="flex flex-row items-center gap-3">
        <Mail className="h-6 w-6 text-primary" />
        <CardTitle className="text-xl font-semibold text-primary">Contact</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {contact.email && (
          <div className="flex items-center gap-3">
            <Mail className="h-4 w-4 text-muted-foreground" />
            <a href={`mailto:${contact.email}`} className="text-sm hover:text-accent transition-colors">
              {contact.email}
            </a>
          </div>
        )}
        {contact.phone && (
           <div className="flex items-center gap-3">
             <Phone className="h-4 w-4 text-muted-foreground" />
             <span className="text-sm text-foreground">{contact.phone}</span>
           </div>
         )}
         <div className="flex items-center gap-3 pt-2">
            <Linkedin className="h-4 w-4 text-muted-foreground" />
             <Link href={contact.linkedin} target="_blank" rel="noopener noreferrer" className="text-sm hover:text-accent transition-colors">
               LinkedIn Profile
             </Link>
         </div>
          <div className="flex items-center gap-3">
             <Github className="h-4 w-4 text-muted-foreground" />
              <Link href={contact.github} target="_blank" rel="noopener noreferrer" className="text-sm hover:text-accent transition-colors">
                GitHub Profile
              </Link>
          </div>
        {/* Optional: Add a Contact Button/Form Link */}
        {/* <Button asChild variant="default" className="w-full mt-4 bg-accent text-accent-foreground hover:bg-accent/90">
          <Link href="/contact">Get in Touch</Link>
        </Button> */}
      </CardContent>
    </Card>
  );
}