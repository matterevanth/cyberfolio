import type { LinkedInProfile } from '@/services/linkedin';
import { getLinkedInProfile } from '@/services/linkedin';
import ExperienceSection from '@/components/experience-section';
import Header from '@/components/header';
import Footer from '@/components/footer';

export default async function ExperiencePage() {
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
      experiences: [], // Ensure experiences is an empty array on error
      educations: [],
      skills: { Tools: [], Frameworks: [], CodeAnalysis: [], Cloud: [], OperatingSystems: [], Programming: [] },
      certifications: [],
      projects: [],
    };
  }

  const displayProfile = profile;

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header />
      <main className="container mx-auto flex-grow max-w-4xl p-4 pt-8 md:p-6 md:pt-10 lg:p-8 lg:pt-12 animate-in fade-in duration-500 ease-out"> {/* Increased max-w */}
        {error && (
          <div className="mb-8 rounded-none border border-destructive p-3 text-destructive text-sm animate-pulse">
            {error}
          </div>
        )}
        <div className="flex flex-col space-y-12 md:space-y-16 lg:space-y-20">
          <section id="experience">
            {/* Pass only the experiences array */}
            <ExperienceSection experiences={displayProfile.experiences} />
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
