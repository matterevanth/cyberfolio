import type { LinkedInProfile } from '@/services/linkedin';
import { getLinkedInProfile } from '@/services/linkedin';
import EducationSection from '@/components/education-section';
import CertificationsSection from '@/components/certifications-section';
import Header from '@/components/header';
import Footer from '@/components/footer';

export default async function EducationPage() {
  const linkedInProfileUrl = 'https://www.linkedin.com/in/revanth-matte/';
  let profile: LinkedInProfile | null = null;
  let error: string | null = null;

  try {
    profile = await getLinkedInProfile(linkedInProfileUrl);
  } catch (err) {
    console.error('Error fetching profile data:', err);
    error = '// Error loading profile data. Please check connection or try again later.';
    // Use minimal fallback data
    profile = {
        fullName: 'Revanth Matte',
        headline: 'Cybersecurity Professional | Ethical Hacker',
        expertise: [],
        profilePictureUrl: '',
        about: '',
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
           <section id="education">
            <EducationSection educations={displayProfile.educations} />
           </section>
           <section id="certifications">
            <CertificationsSection certifications={displayProfile.certifications} />
           </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
