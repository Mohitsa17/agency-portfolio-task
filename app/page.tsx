import HeroSection from '@/components/home/HeroSection';
import ProjectsSection from '@/components/home/ProjectsSection';
import ClientsSection from '@/components/home/ClientsSection';
import ContactSection from '@/components/home/ContactSection';
import NewsletterSection from '@/components/home/NewsletterSection';
import Footer from '@/components/home/Footer';

export default function Home() {
  return (
    <main className="min-h-screen" style={{ transform: 'translateZ(0)', willChange: 'scroll-position' }}>
      <HeroSection />
      <div id="projects">
        <ProjectsSection />
      </div>
      <div id="clients">
        <ClientsSection />
      </div>
      <div id="contact">
        <ContactSection />
      </div>
      <NewsletterSection />
      <Footer />
    </main>
  );
}
