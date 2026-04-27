'use client';

import { useTranslations } from 'next-intl';
import GlassCard from '@/components/ui/GlassCard';
import { cn } from '@/lib/utils';

interface MechanismCardProps {
  stepKey: 'choose' | 'move' | 'discover' | 'receive';
  index: number;
}

const ICONS = {
  choose: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  ),
  move: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
    </svg>
  ),
  discover: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
      <path d="M14.106 5.553a2 2 0 0 0 1.788 0l2.447-1.224A2 2 0 0 1 21 6.118V13a2 2 0 0 1-1.106 1.789l-2.447 1.223a2 2 0 0 0-1.788 0l-3.528 1.764a2 2 0 0 1-1.788 0l-2.447-1.223A2 2 0 0 0 6.106 16.553L3.658 17.777A2 2 0 0 1 1 15.982V9a2 2 0 0 1 1.106-1.789l2.447-1.223a2 2 0 0 0 1.788 0l3.528-1.764a2 2 0 0 1 1.788 0Z" />
      <path d="M15 5.885v13.23" />
      <path d="M9 4.885v13.23" />
    </svg>
  ),
  receive: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
      <path d="m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.204 0l-3.58 2.687a.5.5 0 0 1-.81-.47l1.515-8.526c.05-.286-.072-.578-.306-.745C6.182 10.708 5 9.045 5 7.2a7 7 0 0 1 14 0c0 1.845-1.183 3.508-3.217 4.945a.99.99 0 0 0-.306.745Z" />
    </svg>
  ),
};

export default function MechanismCard({ stepKey, index }: MechanismCardProps) {
  const t = useTranslations(`mechanism.steps.${stepKey}`);
  const accents = ['teal', 'amber', 'coral', 'teal'] as const;
  const accent = accents[index % accents.length];
  const Icon = ICONS[stepKey];

  // Accessing raw data for items array safely
  const rawItems = t.raw('items');
  const items = Array.isArray(rawItems) ? (rawItems as string[]) : undefined;

  // Safe footer access
  const footerText = t('footer');
  const footer = (footerText && footerText !== `mechanism.steps.${stepKey}.footer` && footerText !== "") 
    ? footerText 
    : undefined;

  return (
    <GlassCard 
      glowColor={accent}
      style={{ transitionDelay: `${index * 100}ms` }}
      className="reveal flex flex-col items-start p-8 min-h-[360px] transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl"
    >
      <div className={cn(
        "mb-8 flex h-14 w-14 items-center justify-center rounded-2xl bg-foreground/[0.03]",
        `text-${accent}`
      )}>
        {Icon}
      </div>

      <div className="flex items-center gap-3 mb-6">
        <span className={cn(
          "font-mono text-label font-bold uppercase tracking-widest",
          `text-${accent}`
        )}>
          Step 0{index + 1}
        </span>
      </div>

      <h3 className="font-display text-xl font-bold text-foreground mb-4">
        {t('title')}
      </h3>

      <p className="text-muted leading-relaxed font-medium mb-6">
        {t('description')}
      </p>

      {items && (
        <ul className="w-full space-y-4 mb-6">
          {items.map((item, i) => (
            <li key={i} className="flex items-start gap-3 group/item">
              <div className={cn(
                "mt-1.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-foreground/[0.05] transition-colors duration-300",
                `group-hover/item:bg-${accent}/20`
              )}>
                {stepKey === 'move' ? (
                  <span className="text-[10px] font-bold font-mono">{i + 1}</span>
                ) : (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={cn("w-2.5 h-2.5", `text-${accent}`)}>
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                )}
              </div>
              <span className="text-sm font-medium leading-relaxed text-foreground/80 whitespace-pre-line">
                {item}
              </span>
            </li>
          ))}
        </ul>
      )}

      {footer && (
        <p className="mt-auto text-xs font-bold tracking-wide text-muted border-t border-foreground/5 pt-6 w-full italic">
          {footer}
        </p>
      )}
    </GlassCard>
  );
}
