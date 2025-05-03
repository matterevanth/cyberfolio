import type { LinkedInProfile } from '@/services/linkedin';
import { getLinkedInProfile } from '@/services/linkedin';
import ProfileCard from '@/components/profile-card';
import ExperienceSection from '@/components/experience-section';
import EducationSection from '@/components/education-section';
import ProjectShowcase from '@/components/project-showcase';
import SkillsSection from '@/components/skills-section';
import ContactSection from '@/components/contact-section';
import CertificationsSection from '@/components/certifications-section'; // Import CertificationsSection
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
    error = '// Error loading profile data. Please check connection or try again later.';
    // Provide minimal fallback if even hardcoded fails
    profile = {
      fullName: 'Revanth Matte',
      headline: 'Software Engineer | Cybersecurity',
      expertise: [], // Add fallback
      profilePictureUrl: 'https://picsum.photos/seed/revanth-error/200/200',
      about: '// Error loading profile information.',
      experiences: [],
      educations: [],
      skills: { // Add fallback skills object
        Tools: [], Frameworks: [], CodeAnalysis: [], Cloud: [], OperatingSystems: [], Programming: []
      },
      certifications: [], // Add fallback
      projects: [], // Add fallback
    };
  }

  // Use the fetched (or hardcoded) profile directly
  const displayProfile = profile;


  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header />
      {/* Terminal main container: adjusted padding */}
      <main className="container mx-auto flex-grow max-w-3xl p-4 pt-8 md:p-6 md:pt-10 lg:p-8 lg:pt-12">
        {error && (
          // Terminal error style: Use destructive text color
          <div className="mb-8 rounded-none border border-destructive p-3 text-destructive text-sm">
            {error}
          </div>
        )}

        {/* Single Column Layout */}
        {/* Terminal layout: reduced vertical spacing */}
        <div className="flex flex-col space-y-10 md:space-y-12 lg:space-y-14">
          {/* Profile Section */}
          <section id="about">
             {/* Ensure displayProfile is passed */}
            <ProfileCard profile={displayProfile} />
          </section>

          {/* Contact Section - Moved Here */}
           <section id="contact">
             <ContactSection />
           </section>

          {/* Separator: Muted border */}
          <Separator className="bg-border/50" />

           {/* Expertise Section (Integrated within ProfileCard now) */}

           {/* Skills Section */}
          <section id="skills">
             {/* Ensure displayProfile.skills is passed */}
            <SkillsSection skills={displayProfile.skills} />
          </section>

          {/* Separator: Muted border */}
          <Separator className="bg-border/50" />

          {/* Experience Section */}
          <section id="experience">
             {/* Ensure displayProfile.experiences is passed */}
            <ExperienceSection experiences={displayProfile.experiences} />
          </section>

          {/* Separator: Muted border */}
          <Separator className="bg-border/50" />

          {/* Project Showcase Section */}
          <section id="projects">
             {/* Pass projects from profile data */}
             <ProjectShowcase projects={displayProfile.projects} />
          </section>

          {/* Separator: Muted border */}
          <Separator className="bg-border/50" />

          {/* Education Section */}
           <section id="education">
            {/* Ensure displayProfile.educations is passed */}
            <EducationSection educations={displayProfile.educations} />
           </section>

           {/* Separator: Muted border */}
           <Separator className="bg-border/50" />

            {/* Certifications Section */}
           <section id="certifications">
             {/* Ensure displayProfile.certifications is passed */}
            <CertificationsSection certifications={displayProfile.certifications} />
           </section>


        </div>
      </main>
      <Footer />
    </div>
  );
}

    