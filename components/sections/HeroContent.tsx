'use client';

import AnimatedHeadline from '@/components/ui/AnimatedHeadline';
import GradientButton from '@/components/ui/GradientButton';
import TypewriterText from '@/components/ui/TypewriterText';
import { useStore } from '@/store/useStore';

interface HeroContentProps {
  label: string;
  title: string;
  subtitle: string;
  ctaDownload: string;
  ctaLearn: string;
}

export default function HeroContent({
  label,
  title,
  subtitle,
  ctaDownload,
  ctaLearn,
}: HeroContentProps) {
  const isIntroComplete = useStore((s) => s.isIntroComplete);

  const handleDownloadClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = document.getElementById('download');
    if (el) {
      e.preventDefault();
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      history.replaceState(null, '', '#download');
    }
  };

  return (
    <>
      <p className="font-mono text-label font-bold uppercase tracking-[0.3em] text-teal">
        <TypewriterText start={isIntroComplete} delay={100} speed={45}>
          {label}
        </TypewriterText>
      </p>

      <h1
        id="hero-heading"
        className="mt-8 font-display text-hero font-bold leading-[1.05] tracking-tight text-foreground"
      >
        <span className="animate-hero-shimmer bg-gradient-heroes bg-[length:200%_200%] bg-clip-text text-transparent [animation:hero-shimmer_8s_ease-in-out_infinite]">
          <AnimatedHeadline start={isIntroComplete} delay={420} stagger={0.035}>
            {title}
          </AnimatedHeadline>
        </span>
      </h1>

      <p
        className="hero-rise mt-8 max-w-2xl text-body-lg font-medium text-muted"
        style={{ animationDelay: '800ms' }}
      >
        {subtitle}
      </p>

      <div
        className="hero-rise mt-12 flex flex-wrap items-center justify-center gap-4"
        style={{ animationDelay: '1000ms' }}
      >
        <GradientButton
          variant="primary"
          size="lg"
          href="#download"
          aria-label={ctaDownload}
          onClick={handleDownloadClick}
        >
          {ctaDownload}
        </GradientButton>
        <GradientButton
          variant="ghost"
          size="lg"
          href="https://shop.medalhero.com/collections/all"
          target="_blank"
          rel="noopener noreferrer"
          aria-label={ctaLearn}
        >
          {ctaLearn}
        </GradientButton>
      </div>
    </>
  );
}
