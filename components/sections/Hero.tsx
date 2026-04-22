'use client';

import { useTranslations } from 'next-intl';
import dynamic from 'next/dynamic';
import { useStore } from '@/store/useStore';
import SplitText from '@/components/ui/SplitText';
import ScrollHint from '@/components/ui/ScrollHint';
import SectionLabel from '@/components/ui/SectionLabel';

const Scene = dynamic(() => import('@/components/three/Scene'), { ssr: false });
const HeroOrb = dynamic(() => import('@/components/three/HeroOrb'), { ssr: false });

export default function Hero() {
  const t = useTranslations();
  const isWebGLReady = useStore((state) => state.isWebGLReady);

  return (
    <section
      className="relative flex min-h-screen flex-col items-center justify-center px-6 pt-20 overflow-hidden"
      role="region"
      aria-label={t('hero.label')}
    >
      <div className={`transition-opacity duration-1000 absolute inset-0 ${isWebGLReady ? 'opacity-100' : 'opacity-0'}`}>
        <Scene>
          <HeroOrb />
        </Scene>
      </div>

      {!isWebGLReady && (
        <div className="absolute inset-0 bg-background flex items-center justify-center">
          <div className="h-32 w-32 rounded-full bg-gradient-heroes opacity-5 blur-3xl animate-pulse" />
        </div>
      )}

      <div className="relative z-10 flex flex-col items-center">
        <SectionLabel
          label={t('hero.label')}
          title={<SplitText>{t('hero.title')}</SplitText>}
          description={t('hero.subtitle')}
          align="center"
          accentColor="teal"
          titleSize="hero"
          as="h1"
        />
      </div>

      <ScrollHint />
    </section>
  );
}
