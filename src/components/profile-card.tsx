import type { LinkedInProfile } from '@/services/linkedin';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from '@/components/ui/button'; // Import Button
import { Github, Linkedin, Star } from 'lucide-react'; // Import icons
import Link from 'next/link'; // Import Link
import TypingEffect from './typing-effect';
import { Badge } from '@/components/ui/badge';

interface ProfileCardProps {
  profile: LinkedInProfile;
}

export default function ProfileCard({ profile }: ProfileCardProps) {
  const initials = profile.fullName
    .split(' ')
    .map((n) => n[0])
    .join('');

  // Replace with your actual contact details
  const contact = {
    linkedin: "https://www.linkedin.com/in/revanth-matte/",
    github: "https://github.com/matterevanth",
  };

  return (
    <div className="flex flex-col items-start profile-card-bg">
      {/* Top section: Avatar, Name, Headline, Icons */}
      <div className="flex flex-col items-start gap-4 md:flex-row md:items-center md:gap-6 w-full mb-4 animate-in fade-in duration-300 ease-out">
         <Avatar className="h-24 w-24 md:h-28 md:w-28 border-2 border-primary shadow-none shrink-0 rounded-none animate-in zoom-in-90 duration-500 ease-out">
           <AvatarImage
             src={profile.profilePictureUrl}
             alt={profile.fullName}
             data-ai-hint="profile picture professional dark background hacker"
             className="rounded-none"
           />
           <AvatarFallback className="text-3xl bg-muted rounded-none">{initials}</AvatarFallback>
         </Avatar>
         <div className="space-y-1.5 flex-grow mt-2 md:mt-0 animate-in fade-in slide-in-from-bottom-2 duration-500 delay-100 ease-out">
            <h1 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight">{profile.fullName}</h1>
             <p className="text-base md:text-lg text-primary font-medium">{profile.headline}</p>

             {/* LinkedIn and GitHub Icons */}
             <div className="flex items-center gap-2 pt-1">
                <Button asChild variant="ghost" size="icon" className="h-7 w-7 p-1 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-sm">
                    <Link href={contact.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn Profile">
                        <Linkedin className="h-full w-full" />
                    </Link>
                </Button>
                <Button asChild variant="ghost" size="icon" className="h-7 w-7 p-1 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-sm">
                    <Link href={contact.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub Profile">
                        <Github className="h-full w-full" />
                    </Link>
                </Button>
             </div>

            {/* Expertise Section */}
            {profile.expertise && profile.expertise.length > 0 && (
              <div className="flex flex-wrap items-center gap-1.5 pt-2">
                 <Star className="h-3.5 w-3.5 text-primary/80 mr-0.5" />
                {profile.expertise.map((item, index) => (
                  <Badge key={index} variant="secondary" className="badge-terminal-secondary text-xs px-2 py-0.5 transition-all duration-150 hover:scale-105 hover:bg-primary/20">
                    {item}
                  </Badge>
                ))}
              </div>
            )}
         </div>
      </div>

      {/* About Section */}
       <div className="space-y-2 pt-2 md:pt-0 w-full mt-4 animate-in fade-in slide-in-from-bottom-2 duration-500 delay-200 ease-out">
           <h2 className="text-lg font-semibold text-foreground mb-2 flex items-center">
             <span className="text-primary mr-2 font-mono">$</span>
             About_Me:
            </h2>
            {/* Terminal-like box for About Me */}
           <div className="border border-border/50 bg-card p-4 rounded-none shadow-inner shadow-primary/10">
               <TypingEffect
                  text={profile.about || "Passionate cybersecurity professional and Software Engineer."}
                  className="text-sm text-muted-foreground leading-relaxed font-mono whitespace-pre-line" // Use mono font & preserve newlines
                  cursorClassName="text-primary bg-primary" // Blinking block cursor
                  speed={10} // Slightly faster typing
                  elementType="div" // Use div to better handle newlines
                />
           </div>
       </div>
    </div>
  );
}
