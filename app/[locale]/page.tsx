'use client';

import Hero from '@/components/sections/Hero';
import StatsBar from '@/components/sections/StatsBar';
import Challenges from '@/components/sections/Challenges';
import MedalShowcase from '@/components/sections/MedalShowcase';
import PhoneShowcase from '@/components/sections/PhoneShowcase';
import ImpactSection from '@/components/sections/ImpactSection';
import ActivityRibbon from '@/components/ui/ActivityRibbon';
import FinalCTA from '@/components/sections/FinalCTA';

export default function Home() {
  return (
    <main className="flex-1">
      <Hero />
      <StatsBar />
      <Challenges />
      <PhoneShowcase />
      <ImpactSection />
      <ActivityRibbon />
      <MedalShowcase />
      <FinalCTA />
    </main>
  );
}
