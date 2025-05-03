import type { LinkedInProfile } from '@/services/linkedin';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Image from 'next/image';
import { Separator } from '../ui/separator'; // Added Separator

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
      <div className="flex flex-col items-start gap-4 md:flex-row md:items-center md:gap-6 w-full mb-4">
         {/* Terminal style avatar: square, no shadow, primary border */}
         <Avatar className="h-24 w-24 md:h-28 md:w-28 border-2 border-primary shadow-none shrink-0 rounded-none">
           <AvatarImage
             src={profile.profilePictureUrl}
             alt={profile.fullName}
             data-ai-hint="profile picture professional dark background"
             className="rounded-none" // Ensure image inside is square
           />
           <AvatarFallback className="text-3xl bg-muted rounded-none">{initials}</AvatarFallback>
         </Avatar>
         <div className="space-y-1 flex-grow mt-2 md:mt-0">
            {/* Use foreground for name, primary for headline */}
            <h1 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight">{profile.fullName}</h1>
            <p className="text-base md:text-lg text-primary font-medium">{profile.headline}</p>
         </div>
      </div>

      {/* About Section */}
       <div className="space-y-2 pt-2 md:pt-0 w-full mt-4">
          {/* Use foreground for title, muted-foreground for text */}
          <h2 className="text-lg font-semibold text-foreground mb-1">About Me:</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">{profile.about || "Cybersecurity professional and Software Engineer."}</p>
       </div>
    </div>
  );
}
