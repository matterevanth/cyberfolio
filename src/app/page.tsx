import type { LinkedInProfile } from '@/services/linkedin';
import { getLinkedInProfile } from '@/services/linkedin';
import ProfileCard from '@/components/profile-card';
// Removed ContactSection import
import EducationSection from '@/components/education-section'; // Import Education
import CertificationsSection from '@/components/certifications-section'; // Import Certifications
import Header from '@/components/header';
import Footer from '@/components/footer';

export default async function Home() {
  const linkedInProfileUrl = 'https://www.linkedin.com/in/revanth-matte/';
  let profile: LinkedInProfile | null = null;
  let error: string | null = null;

  try {
    profile = await getLinkedInProfile(linkedInProfileUrl);
  } catch (err) {
    console.error('Error fetching profile data (using hardcoded):', err);
    error = '// Error loading profile data. Please check connection or try again later.';
    profile = {
      fullName: 'Revanth Matte',
      headline: 'Cybersecurity Professional | Ethical Hacker',
      expertise: [],
      profilePictureUrl: 'https://picsum.photos/seed/revanth-error/200/200',
      about: '// Error loading profile information.',
      experiences: [],
      educations: [], // Ensure educations is empty array on error
      skills: { Tools: [], Frameworks: [], CodeAnalysis: [], Cloud: [], OperatingSystems: [], Programming: [] },
      certifications: [], // Ensure certifications is empty array on error
      projects: [],
    };
  }

  const displayProfile = profile;

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header />
      <main className="container mx-auto flex-grow max-w-3xl p-4 pt-8 md:p-6 md:pt-10 lg:p-8 lg:pt-12 animate-in fade-in duration-500 ease-out">
        {error && (
          <div className="mb-8 rounded-none border border-destructive p-3 text-destructive text-sm animate-pulse">
            {error}
          </div>
        )}

        <div className="flex flex-col space-y-12 md:space-y-16 lg:space-y-20">
          {/* Profile Section */}
          <section id="about" className="scroll-mt-16">
            <ProfileCard profile={displayProfile} />
          </section>

          {/* Education Section */}
          <section id="education" className="scroll-mt-16">
            <EducationSection educations={displayProfile.educations} />
          </section>

          {/* Certifications Section */}
           <section id="certifications" className="scroll-mt-16">
             <CertificationsSection certifications={displayProfile.certifications} />
           </section>

          {/* Skills Section Removed */}
          {/* Experience, Projects are on separate pages */}
          {/* Contact Section removed from main page structure */}

        </div>
      </main>
      <Footer />
    </div>
  );
}
