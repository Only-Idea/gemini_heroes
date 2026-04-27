import { getTranslations } from 'next-intl/server';
import SectionLabel from '@/components/ui/SectionLabel';
import MechanismCard from '@/components/ui/MechanismCard';

const STEP_KEYS = ['choose', 'move', 'discover', 'receive'] as const;

export default async function MechanismSection() {
  const t = await getTranslations('mechanism');

  return (
    <section
      id="mechanism"
      className="relative py-32 lg:py-48 overflow-hidden bg-background"
    >
      <div className="mx-auto max-w-[1400px] w-full px-6">
        {/* Aligned Header — matches Section 03 alignment and width rhythm */}
        <div className="mb-24 max-w-2xl lg:w-1/2">
          <SectionLabel
            number="04"
            label={t('label').split(' / ')[1]}
            title={t('title')}
            description={t('subtitle')}
            accentColor="teal"
          />
        </div>

        {/* Card grid with consistent container width */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {STEP_KEYS.map((key, index) => (
            <MechanismCard key={key} stepKey={key} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
