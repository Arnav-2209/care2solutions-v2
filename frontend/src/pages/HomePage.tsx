import HeroSection from '../sections/HeroSection';
import AboutSection from '../sections/AboutSection';
import JourneySection from '../sections/JourneySection';
import ResourcesSection from '../sections/ResourcesSection';

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
        onGetFreeAudit={() => scrollToSection('contact')}
      />
      <JourneySection />
      <AboutSection />
      <ResourcesSection />
    </main>
  );
}
