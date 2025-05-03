import type { LinkedInProfile } from '@/services/linkedin';
import { getLinkedInProfile } from '@/services/linkedin';
import ProfileCard from '@/components/profile-card';
import ExperienceSection from '@/components/experience-section';
import EducationSection from '@/components/education-section';
import ProjectShowcase from '@/components/project-showcase';
import SkillsSection from '@/components/skills-section';
import ContactSection from '@/components/contact-section';
import CertificationsSection from '@/components/certifications-section'; // Import CertificationsSection
import Header from '@/components/header';
import Footer from '@/components/footer';
// Removed TerminalDivider import

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
      headline: 'Cybersecurity Professional | Ethical Hacker', // Corrected designation
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
      {/* Added fade-in animation */}
      <main className="container mx-auto flex-grow max-w-3xl p-4 pt-8 md:p-6 md:pt-10 lg:p-8 lg:pt-12 animate-in fade-in duration-500 ease-out">
        {error && (
          // Terminal error style: Use destructive text color
          <div className="mb-8 rounded-none border border-destructive p-3 text-destructive text-sm animate-pulse">
            {error}
          </div>
        )}

        {/* Single Column Layout */}
        {/* Terminal layout: adjusted vertical spacing */}
        <div className="flex flex-col space-y-12 md:space-y-16 lg:space-y-20"> {/* Increased spacing */}
          {/* Profile Section */}
          <section id="about" className="scroll-mt-16">
             {/* Ensure displayProfile is passed */}
            <ProfileCard profile={displayProfile} />
          </section>

          {/* Contact Section - Moved Under Profile */}
           <section id="contact" className="scroll-mt-16">
             <ContactSection />
           </section>

          {/* Removed Thematic Divider */}

           {/* Skills Section */}
          <section id="skills" className="scroll-mt-16">
             {/* Ensure displayProfile.skills is passed */}
            <SkillsSection skills={displayProfile.skills} />
          </section>

          {/* Removed Thematic Divider */}

          {/* Experience Section */}
          <section id="experience" className="scroll-mt-16">
             {/* Ensure displayProfile.experiences is passed */}
            <ExperienceSection experiences={displayProfile.experiences} />
          </section>

          {/* Removed Thematic Divider */}

          {/* Project Showcase Section */}
          <section id="projects" className="scroll-mt-16">
             {/* Pass projects from profile data */}
             <ProjectShowcase projects={displayProfile.projects} />
          </section>

          {/* Removed Thematic Divider */}

          {/* Education Section */}
           <section id="education" className="scroll-mt-16">
            {/* Ensure displayProfile.educations is passed */}
            <EducationSection educations={displayProfile.educations} />
           </section>

           {/* Removed Thematic Divider */}

            {/* Certifications Section */}
           <section id="certifications" className="scroll-mt-16">
             {/* Ensure displayProfile.certifications is passed */}
            <CertificationsSection certifications={displayProfile.certifications} />
           </section>


        </div>
      </main>
      <Footer />
    </div>
  );
}
