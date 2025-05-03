import type { LinkedInProfile } from '@/services/linkedin';
import { getLinkedInProfile } from '@/services/linkedin';
import ProfileCard from '@/components/profile-card';
import ExperienceSection from '@/components/experience-section';
import EducationSection from '@/components/education-section';
import ProjectShowcase from '@/components/project-showcase';
import ContactSection from '@/components/contact-section';
import { Separator } from '@/components/ui/separator';
import Header from '@/components/header';
import Footer from '@/components/footer';

export default async function Home() {
  const linkedInProfileUrl = 'https://www.linkedin.com/in/revanth-matte/';
  let profile: LinkedInProfile | null = null;
  let error: string | null = null;

  try {
    // Fetch profile data on the server
    profile = await getLinkedInProfile(linkedInProfileUrl);
  } catch (err) {
    console.error('Error fetching LinkedIn profile:', err);
    error = 'Failed to load profile data. Please try again later.';
    // Assign dummy data in case of error to prevent build failure,
    // or handle the error state appropriately in the UI.
    profile = {
      fullName: 'Error Loading Profile',
      headline: '',
      profilePictureUrl: 'https://picsum.photos/200/200', // Placeholder image
      about: '',
      experiences: [],
      educations: [],
    };
  }


  return (
    <div className="flex min-h-screen flex-col bg-secondary">
      <Header />
      <main className="container mx-auto flex-grow p-4 md:p-8 lg:p-12">
        {error && (
          <div className="mb-8 rounded-md border border-destructive bg-destructive/10 p-4 text-destructive">
            {error}
          </div>
        )}
        {profile && (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {/* Profile Section - Spans 1 column on medium screens and up */}
            <div className="md:col-span-1">
              <ProfileCard profile={profile} />
              <Separator className="my-6 md:hidden" /> {/* Separator for mobile */}
              <ContactSection />
            </div>

            {/* Main Content - Spans 2 columns on medium screens and up */}
            <div className="space-y-8 md:col-span-2">
              <ExperienceSection experiences={profile.experiences} />
              <Separator />
              <EducationSection educations={profile.educations} />
              <Separator />
              <ProjectShowcase />
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}