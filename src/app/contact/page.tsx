import ContactSection from '@/components/contact-section';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { Mail } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header />
      <main className="container mx-auto flex-grow max-w-3xl p-4 pt-8 md:p-6 md:pt-10 lg:p-8 lg:pt-12 animate-in fade-in duration-500 ease-out">
        <div className="flex flex-col items-center justify-center space-y-6 text-center mt-16">
            <Mail className="h-16 w-16 text-primary animate-bounce" />
            <h1 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight">Get In Touch</h1>
            <p className="text-muted-foreground max-w-md">
               // Feel free to reach out via email or connect with me on social platforms.
               // Let's discuss cybersecurity, projects, or potential opportunities.
            </p>
            <ContactSection />
        </div>
      </main>
      <Footer />
    </div>
  );
}
