import dynamic from 'next/dynamic';
import Hero from '@/components/sections/Hero';
import StatsBar from '@/components/sections/StatsBar';
import MechanismSection from '@/components/sections/MechanismSection';
import Challenges from '@/components/sections/Challenges';

// Below-the-fold sections are code-split to keep initial JS lean. They still
// SSR (no `ssr: false`), so their text content is in the initial HTML for
// crawlers — only the JS payload is deferred.
const PhoneShowcase = dynamic(() => import('@/components/sections/PhoneShowcase'), {
  loading: () => <div className="min-h-[50vh] bg-foreground/[0.02]" />,
});
const ImpactSection = dynamic(() => import('@/components/sections/ImpactSection'), {
  loading: () => <div className="min-h-[50vh] bg-white" />,
});
const ActivityRibbon = dynamic(() => import('@/components/sections/ActivityRibbon'), {
  loading: () => <div className="h-24 lg:h-32 bg-white" />,
});
const MedalShowcase = dynamic(() => import('@/components/sections/MedalShowcase'), {
  loading: () => <div className="min-h-[50vh] bg-background" />,
});
const FinalCTA = dynamic(() => import('@/components/sections/FinalCTA'), {
  loading: () => <div className="min-h-[50vh] bg-background" />,
});
const ContactSection = dynamic(() => import('@/components/sections/ContactSection'), {
  loading: () => <div className="min-h-[50vh] bg-background" />,
});

export default function Home() {
  return (
    <main id="main" className="flex-1">
      <Hero />
      <StatsBar />
      <Challenges />
      <PhoneShowcase />
      <ImpactSection />
      <MechanismSection />
      <ActivityRibbon />
      <MedalShowcase />
      <FinalCTA />
      <ContactSection />
    </main>
  );
}
