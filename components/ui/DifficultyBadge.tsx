import { cn } from '@/lib/utils';

export type DifficultyLevel = 'Easy' | 'Moderate' | 'Epic';

interface DifficultyBadgeProps {
  level: DifficultyLevel;
  className?: string;
}

const levelStyles: Record<DifficultyLevel, { dot: string; ring: string; text: string }> = {
  Easy: {
    dot: 'bg-teal',
    ring: 'border-teal/40 bg-teal/10',
    text: 'text-teal',
  },
  Moderate: {
    dot: 'bg-amber',
    ring: 'border-amber/50 bg-amber/10',
    text: 'text-amber',
  },
  Epic: {
    dot: 'bg-coral',
    ring: 'border-coral/50 bg-coral/10',
    text: 'text-coral',
  },
};

export default function DifficultyBadge({ level, className = '' }: DifficultyBadgeProps) {
  const s = levelStyles[level];
  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 rounded-full border px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.25em]',
        s.ring,
        s.text,
        className
      )}
    >
      <span className={cn('h-1.5 w-1.5 rounded-full', s.dot)} aria-hidden="true" />
      {level}
    </span>
  );
}
