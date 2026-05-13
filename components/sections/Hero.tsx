import { getTranslations } from 'next-intl/server';
import HeroClient from './HeroClient';
import HeroContent from './HeroContent';

export default async function Hero() {
  const t = await getTranslations('hero');

  return (
    <HeroClient>
      <HeroContent
        label={t('label')}
        title={t('title')}
        subtitle={t('subtitle')}
        ctaDownload={t('cta_download')}
        ctaLearn={t('cta_learn')}
      />
    </HeroClient>
  );
}
