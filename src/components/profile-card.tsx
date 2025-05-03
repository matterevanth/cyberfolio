import type { LinkedInProfile } from '@/services/linkedin';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// Removed unused Card imports
import Image from 'next/image';
// Removed unused Separator import
import TypingEffect from './typing-effect'; // Import TypingEffect
import { Badge } from '@/components/ui/badge'; // Import Badge for expertise - FIXED PATH
// Removed unused Tooltip imports
import { Star } from 'lucide-react'; // Icon for expertise


interface ProfileCardProps {
  profile: LinkedInProfile;
}

export default function ProfileCard({ profile }: ProfileCardProps) {
  // Fallback initials from name
  const initials = profile.fullName
    .split(' ')
    .map((n) => n[0])
    .join('');

  return (
    // Added profile-card-bg for specific background targeting if needed
    // Removed gap for tighter layout
    <div className="flex flex-col items-start profile-card-bg">
      {/* Top section: Avatar, Name, Headline */}
      {/* Added animation classes */}
      <div className="flex flex-col items-start gap-4 md:flex-row md:items-center md:gap-6 w-full mb-4 animate-in fade-in duration-300 ease-out">
         {/* Terminal style avatar: square, no shadow, primary border */}
         <Avatar className="h-24 w-24 md:h-28 md:w-28 border-2 border-primary shadow-none shrink-0 rounded-none animate-in zoom-in-90 duration-500 ease-out">
           <AvatarImage
             src={profile.profilePictureUrl}
             alt={profile.fullName}
             data-ai-hint="profile picture professional dark background hacker" // Updated AI hint
             className="rounded-none" // Ensure image inside is square
           />
           <AvatarFallback className="text-3xl bg-muted rounded-none">{initials}</AvatarFallback>
         </Avatar>
         {/* Added animation classes with slight delay */}
         <div className="space-y-1 flex-grow mt-2 md:mt-0 animate-in fade-in slide-in-from-bottom-2 duration-500 delay-100 ease-out">
            {/* Use foreground for name, primary for headline */}
            <h1 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight">{profile.fullName}</h1>
             <p className="text-base md:text-lg text-primary font-medium">{profile.headline}</p>

            {/* Expertise Section */}
            {profile.expertise && profile.expertise.length > 0 && (
              <div className="flex flex-wrap items-center gap-1.5 mt-2">
                 <Star className="h-3.5 w-3.5 text-primary/80 mr-0.5" /> {/* Expertise Icon */}
                {profile.expertise.map((item, index) => (
                  // Terminal badge style for expertise
                  // Added subtle animation on badges
                  <Badge key={index} variant="secondary" className="badge-terminal-secondary text-xs px-2 py-0.5 transition-all duration-150 hover:scale-105 hover:bg-primary/20">
                    {item}
                  </Badge>
                ))}
              </div>
            )}
         </div>
      </div>

      {/* About Section */}
       {/* Added animation classes with slight delay */}
       <div className="space-y-2 pt-2 md:pt-0 w-full mt-4 animate-in fade-in slide-in-from-bottom-2 duration-500 delay-200 ease-out">
          {/* Use foreground for title, muted-foreground for text */}
           <h2 className="text-lg font-semibold text-foreground mb-1 flex items-center">
             <span className="text-primary mr-2 font-mono">$</span> {/* Command prompt style */}
             About_Me:
            </h2>
           {/* Use TypingEffect for the about text - Added space */}
           <TypingEffect
              text={profile.about || "A passionate cybersecurity professional and Software Engineer."} // Removed leading 'A '
              className="text-sm text-muted-foreground leading-relaxed pl-4" // Indent text
              cursorClassName="text-primary" // Style the cursor
              speed={15} // Slightly faster typing
            />
       </div>
    </div>
  );
}
