import type { LinkedInProfile } from '@/services/linkedin';
import { getLinkedInProfile } from '@/services/linkedin';
import ProfileCard from '@/components/profile-card';
import ExperienceSection from '@/components/experience-section';
import EducationSection from '@/components/education-section';
import ProjectShowcase from '@/components/project-showcase';
import SkillsSection from '@/components/skills-section'; // Import SkillsSection
import ContactSection from '@/components/contact-section';
import { Separator } from '@/components/ui/separator';
import Header from '@/components/header';
import Footer from '@/components/footer';

export default async function Home() {
  // Update this URL if your LinkedIn profile URL is different (though data is hardcoded now)
  const linkedInProfileUrl = 'https://www.linkedin.com/in/revanth-matte/';
  let profile: LinkedInProfile | null = null;
  let error: string | null = null;

  try {
    // Fetch profile data on the server (currently returns hardcoded data)
    profile = await getLinkedInProfile(linkedInProfileUrl);
  } catch (err) {
    console.error('Error fetching profile data (using hardcoded):', err);
    // In a real scenario, you might set an error state here.
    // Since data is hardcoded, we expect it to succeed unless the service itself errors.
    error = 'Failed to load profile data. Please try again later.';
    // Provide minimal fallback if even hardcoded fails
    profile = {
      fullName: 'Revanth Matte',
      headline: 'Software Engineer | Cybersecurity',
      profilePictureUrl: 'https://picsum.photos/seed/revanth-error/200/200',
      about: 'Error loading profile information.',
      experiences: [],
      educations: [],
      skills: { // Add fallback skills object
        Tools: [], Frameworks: [], CodeAnalysis: [], Cloud: [], OperatingSystems: [], Programming: []
      }
    };
  }

  // Use the fetched (or hardcoded) profile directly
  const displayProfile = profile;


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
             {/* Ensure displayProfile is passed */}
            <ProfileCard profile={displayProfile} />
          </section>

          {/* Contact Section - Moved Here */}
           <section id="contact">
             <ContactSection />
           </section>

          <Separator className="bg-border/50" />

          {/* Skills Section */}
          <section id="skills">
             {/* Ensure displayProfile.skills is passed */}
            <SkillsSection skills={displayProfile.skills} />
          </section>

          <Separator className="bg-border/50" />

          {/* Experience Section */}
          <section id="experience">
             {/* Ensure displayProfile.experiences is passed */}
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
            {/* Ensure displayProfile.educations is passed */}
            <EducationSection educations={displayProfile.educations} />
           </section>

           {/* Separator removed from here as Contact is moved up */}

        </div>
      </main>
      <Footer />
    </div>
  );
}
