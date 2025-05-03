import type { LinkedInProfile } from '@/services/linkedin';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from 'next/image';
import TypingEffect from './typing-effect';
import { Badge } from '@/components/ui/badge';
import { Star } from 'lucide-react';

interface ProfileCardProps {
  profile: LinkedInProfile;
}

export default function ProfileCard({ profile }: ProfileCardProps) {
  const initials = profile.fullName
    .split(' ')
    .map((n) => n[0])
    .join('');

  return (
    <div className="flex flex-col items-start profile-card-bg">
      {/* Top section: Avatar, Name, Headline */}
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
         <div className="space-y-1 flex-grow mt-2 md:mt-0 animate-in fade-in slide-in-from-bottom-2 duration-500 delay-100 ease-out">
            <h1 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight">{profile.fullName}</h1>
             <p className="text-base md:text-lg text-primary font-medium">{profile.headline}</p>

            {/* Expertise Section */}
            {profile.expertise && profile.expertise.length > 0 && (
              <div className="flex flex-wrap items-center gap-1.5 mt-2">
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
           <h2 className="text-lg font-semibold text-foreground mb-1 flex items-center">
             <span className="text-primary mr-2 font-mono">$</span>
             About_Me:
            </h2>
           <TypingEffect
              text={profile.about || "Passionate cybersecurity professional and Software Engineer."}
              className="text-sm text-muted-foreground leading-relaxed pl-4"
              cursorClassName="text-primary"
              speed={15}
            />
       </div>
       {/* ContactSection removed from here */}
    </div>
  );
}
