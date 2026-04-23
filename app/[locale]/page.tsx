'use client';

import dynamic from 'next/dynamic';
import Hero from '@/components/sections/Hero';
import StatsBar from '@/components/sections/StatsBar';
import Challenges from '@/components/sections/Challenges';
import JsonLd from '@/components/ui/JsonLd';

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
  const applicationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'MobileApplication',
    'name': 'Heroes',
    'operatingSystem': 'iOS, Android',
    'applicationCategory': 'HealthApplication, SportsApplication',
    'description': 'A purpose-driven virtual challenge platform themed around iconic Japanese routes.',
    'offers': {
      '@type': 'Offer',
      'price': '0',
      'priceCurrency': 'USD'
    }
  };

  return (
    <main className="flex-1">
      <JsonLd data={applicationJsonLd} />
      <Hero />
      <StatsBar />
      <Challenges />
      <PhoneShowcase />
      <ImpactSection />
      <ActivityRibbon />
      <MedalShowcase />
      <FinalCTA />
      <ContactSection />
    </main>
  );
}
