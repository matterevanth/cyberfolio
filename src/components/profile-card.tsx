import type { LinkedInProfile } from '@/services/linkedin';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Image from 'next/image';

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
    <div className="flex flex-col items-start gap-6 md:flex-row md:items-center md:gap-10">
       <Avatar className="h-28 w-28 md:h-32 md:w-32 border-2 border-primary/50 shadow-sm shrink-0">
         {/* Use next/image for optimization, though URL is external */}
         <AvatarImage
           src={profile.profilePictureUrl}
           alt={profile.fullName}
           data-ai-hint="profile picture professional dark background"
         />
         <AvatarFallback className="text-3xl bg-muted">{initials}</AvatarFallback>
       </Avatar>
       <div className="space-y-2">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">{profile.fullName}</h1>
          <p className="text-lg md:text-xl text-primary font-medium">{profile.headline}</p>
          <p className="text-base text-muted-foreground leading-relaxed pt-2">{profile.about || "Software Engineer based in [Your Location]."}</p>
       </div>
    </div>
  );
}
