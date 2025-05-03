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
    <div className="flex flex-col items-start gap-6 md:gap-10">
      {/* Top section: Avatar, Name, Headline */}
      <div className="flex flex-col items-start gap-4 md:flex-row md:items-center md:gap-6 w-full">
         <Avatar className="h-28 w-28 md:h-32 md:w-32 border-2 border-primary/50 shadow-sm shrink-0">
           {/* Use next/image for optimization, though URL is external */}
           <AvatarImage
             src={profile.profilePictureUrl}
             alt={profile.fullName}
             data-ai-hint="profile picture professional dark background"
           />
           <AvatarFallback className="text-3xl bg-muted">{initials}</AvatarFallback>
         </Avatar>
         <div className="space-y-1 flex-grow">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">{profile.fullName}</h1>
            <p className="text-lg md:text-xl text-primary font-medium">{profile.headline}</p>
         </div>
      </div>

      {/* About Section - Now a separate div below the top section */}
       <div className="space-y-2 pt-2 md:pt-0 w-full">
          <h2 className="text-xl font-semibold text-foreground mb-2">About Me</h2>
          <p className="text-base text-muted-foreground leading-relaxed">{profile.about || "Cybersecurity professional and Software Engineer."}</p>
       </div>
    </div>
  );
}
