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
  // Update this URL if your LinkedIn profile URL is different
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
    profile = {
      fullName: 'Revanth Matte', // Updated fallback
      headline: 'Software Engineer | Full Stack Developer', // Updated fallback
      profilePictureUrl: 'https://picsum.photos/seed/revanth-error/200/200', // Placeholder image
      about: 'Error loading profile information. Please check back later.',
      experiences: [],
      educations: [],
    };
  }

  // Ensure profile is not null for rendering, even if error occurred
  const displayProfile = profile || {
      fullName: 'Revanth Matte', // Updated fallback
      headline: 'Software Engineer | Full Stack Developer', // Updated fallback
      profilePictureUrl: 'https://picsum.photos/seed/revanth-loading/200/200',
      about: 'Loading profile...',
      experiences: [],
      educations: [],
  };


  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header />
      <main className="container mx-auto flex-grow max-w-4xl p-4 pt-16 md:p-8 md:pt-20 lg:p-12 lg:pt-24">
        {error && (
          <div className="mb-12 rounded-md border border-destructive bg-destructive/10 p-4 text-destructive">
            {error}
          </div>
        )}

        {/* Single Column Layout */}
        <div className="flex flex-col space-y-16 md:space-y-20 lg:space-y-24">
          {/* Profile Section */}
          <section id="about">
            <ProfileCard profile={displayProfile} />
          </section>

          <Separator className="bg-border/50" />

          {/* Experience Section */}
          <section id="experience">
            <ExperienceSection experiences={displayProfile.experiences} />
          </section>

          <Separator className="bg-border/50" />

          {/* Project Showcase Section */}
          <section id="projects">
            <ProjectShowcase />
          </section>

          <Separator className="bg-border/50" />

          {/* Education Section */}
           <section id="education">
            <EducationSection educations={displayProfile.educations} />
           </section>

           <Separator className="bg-border/50" />

           {/* Contact Section */}
           <section id="contact">
             <ContactSection />
           </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
