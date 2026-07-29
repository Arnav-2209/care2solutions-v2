import HeroSection from '../sections/HeroSection';
import StatsSection from '../sections/StatsSection';
import AboutSection from '../sections/AboutSection';
import JourneySection from '../sections/JourneySection';
import ResourcesSection from '../sections/ResourcesSection';
import ContactSection from '../sections/ContactSection';
import AuditQuoteSection from '../sections/AuditQuoteSection';

export default function HomePage() {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <main>
      <HeroSection
        onBookConsultation={() => scrollToSection('contact')}
        onGetFreeAudit={() => scrollToSection('faq')}
      />
      <StatsSection />
      <JourneySection />
      <AboutSection />
      <ResourcesSection />
      <ContactSection />
      <AuditQuoteSection />
    </main>
  );
}
