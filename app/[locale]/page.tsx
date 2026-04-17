import { useTranslations } from 'next-intl';

export default function Home() {
  const t = useTranslations();

  return (
    <main className="flex-1">
      {/* Hero Section */}
      <section className="relative flex min-h-screen flex-col items-center justify-center px-6">
        <p className="font-mono text-label font-medium uppercase tracking-[0.25em] text-stone">
          {t('hero.label')}
        </p>
        <h1 className="mt-6 max-w-4xl text-gradient-heroes text-center font-display text-hero font-black leading-[1.15] tracking-[0.02em]">
          {t('hero.title')}
        </h1>
        <p className="mt-4 max-w-xl text-center text-body-lg font-light leading-[1.59] text-stone">
          {t('hero.subtitle')}
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <button className="rounded-full bg-gradient-heroes px-6 py-3 font-mono text-button font-medium tracking-[0.1em] text-void transition-all duration-400 hover:-translate-y-0.5 hover:shadow-lg">
            {t('hero.cta_download')}
          </button>
          <button className="rounded-full border border-border px-6 py-3 font-mono text-button font-medium tracking-[0.1em] text-ivory transition-colors duration-300 hover:border-ivory">
            {t('hero.cta_learn')}
          </button>
        </div>
        {/* Scroll hint */}
        <div className="absolute bottom-8 flex flex-col items-center gap-2">
          <span className="font-mono text-[10px] tracking-[0.2em] text-ash">
            {t('hero.scroll')}
          </span>
          <div className="h-8 w-[1px] animate-pulse bg-gradient-to-b from-ash to-transparent" />
        </div>
      </section>

      {/* Stats Bar */}
      <section className="border-y border-gradient-heroes py-12">
        <div className="mx-auto flex max-w-[1400px] flex-col items-center justify-around gap-8 px-6 md:flex-row md:gap-0">
          {[
            { value: '3', label: t('stats.routes') },
            { value: '12', label: t('stats.activities') },
            { value: '32+', label: t('stats.countries') },
          ].map(({ value, label }) => (
            <div key={label} className="text-center">
              <span className="font-display text-stat font-bold text-ivory">{value}</span>
              <p className="mt-1 font-mono text-label font-medium tracking-[0.15em] text-stone">
                {label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Challenges */}
      <section id="challenges" className="px-6 py-[var(--space-2xl)]">
        <div className="mx-auto max-w-[1400px]">
          <p className="font-mono text-label font-medium uppercase tracking-[0.25em] text-teal">
            01 /
          </p>
          <h2 className="mt-4 font-display text-section-title font-bold text-ivory">
            {t('nav.challenges')}
          </h2>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {['富士山', '浪人', '鉄道'].map((name) => (
              <div
                key={name}
                className="group rounded-[var(--radius-card)] border border-border bg-carbon p-8 transition-all duration-500 hover:-translate-y-1.5 hover:border-coral"
              >
                <div className="mb-6 aspect-video rounded-[var(--radius-sm)] bg-slate" />
                <h3 className="font-display text-challenge font-bold tracking-[0.08em]">
                  {name}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Medal */}
      <section className="px-6 py-[var(--space-2xl)]">
        <div className="mx-auto max-w-[1400px] text-center">
          <p className="font-mono text-label font-medium uppercase tracking-[0.25em] text-teal">
            02 / {t('medal.label')}
          </p>
          <h2 className="mt-4 font-display text-section-title font-bold text-ivory">
            {t('medal.title')}
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-body font-light leading-[1.59] text-stone">
            {t('medal.description')}
          </p>
          {/* 3D Medal placeholder */}
          <div className="mx-auto mt-12 flex h-[400px] w-[400px] items-center justify-center rounded-full border border-border bg-carbon">
            <span className="text-ash">3D Medal</span>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="px-6 py-[var(--space-2xl)]">
        <div className="mx-auto max-w-[1400px]">
          <p className="font-mono text-label font-medium uppercase tracking-[0.25em] text-teal">
            03 /
          </p>
          <h2 className="mt-4 font-display text-section-title font-bold text-ivory">
            {t('nav.features')}
          </h2>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {(
              ['map', 'tracking', 'team', 'achievements', 'streak', 'community'] as const
            ).map((key) => (
              <div
                key={key}
                className="rounded-[var(--radius-card)] border border-border bg-carbon p-6 transition-all duration-400 hover:scale-[1.02] hover:border-coral"
              >
                <h3 className="font-display text-[18px] font-bold">{t(`features.${key}`)}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact */}
      <section id="impact" className="px-6 py-[var(--space-2xl)]">
        <div className="mx-auto max-w-[1400px] text-center">
          <p className="font-mono text-label font-medium uppercase tracking-[0.25em] text-teal">
            04 /
          </p>
          <h2 className="mt-4 font-display text-section-title font-bold text-ivory">
            {t('impact.title')}
          </h2>
          <div className="mt-12 flex flex-col items-center justify-center gap-12 md:flex-row md:gap-24">
            <div className="text-center">
              <span className="font-display text-stat font-bold text-amber">10,000+</span>
              <p className="mt-2 font-mono text-label tracking-[0.15em] text-stone">
                {t('impact.trees')}
              </p>
            </div>
            <div className="text-center">
              <span className="font-display text-stat font-bold text-teal">500+</span>
              <p className="mt-2 font-mono text-label tracking-[0.15em] text-stone">
                {t('impact.ocean')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Activities ribbon placeholder */}
      <section className="overflow-hidden border-y border-border py-8">
        <p className="text-center font-mono text-label font-medium uppercase tracking-[0.25em] text-stone">
          {t('activities.message')}
        </p>
      </section>

      {/* Final CTA */}
      <section className="flex min-h-[60vh] flex-col items-center justify-center px-6 py-[var(--space-2xl)]">
        <h2 className="text-gradient-heroes text-center font-display text-section-title font-bold">
          {t('cta.title')}
        </h2>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <button className="rounded-full bg-gradient-heroes px-8 py-4 font-mono text-button font-medium tracking-[0.1em] text-void transition-all duration-400 hover:-translate-y-0.5">
            App Store
          </button>
          <button className="rounded-full bg-gradient-heroes px-8 py-4 font-mono text-button font-medium tracking-[0.1em] text-void transition-all duration-400 hover:-translate-y-0.5">
            Google Play
          </button>
        </div>
      </section>
    </main>
  );
}
