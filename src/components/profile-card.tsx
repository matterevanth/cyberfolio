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
    <Card className="overflow-hidden shadow-md transition-shadow hover:shadow-lg">
      <CardHeader className="items-center text-center bg-primary/10 p-6">
         <Avatar className="h-24 w-24 border-4 border-background shadow-sm">
           {/* Use next/image for optimization, though URL is external */}
           <AvatarImage
             src={profile.profilePictureUrl}
             alt={profile.fullName}
             data-ai-hint="profile picture professional"
           />
           <AvatarFallback className="text-2xl">{initials}</AvatarFallback>
         </Avatar>
        <CardTitle className="mt-4 text-2xl font-bold text-primary">{profile.fullName}</CardTitle>
        <CardDescription className="text-muted-foreground">{profile.headline}</CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <h3 className="mb-2 text-lg font-semibold text-primary">About</h3>
        <p className="text-sm text-foreground/80 leading-relaxed">{profile.about || "No about information provided."}</p>
      </CardContent>
    </Card>
  );
}