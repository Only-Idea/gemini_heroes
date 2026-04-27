import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface SectionLabelProps {
  number?: string;
  label?: string;
  title: ReactNode;
  description?: string;
  accentColor?: 'teal' | 'coral' | 'amber' | 'muted';
  align?: 'left' | 'center';
  className?: string;
  itemClassName?: string;
  labelClassName?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  titleSize?: 'default' | 'hero';
  as?: 'h1' | 'h2' | 'h3';
  /** Optional id for the heading element — pair with aria-labelledby on the parent <section>. */
  headingId?: string;
}

export default function SectionLabel({
  number,
  label,
  title,
  description,
  accentColor = 'teal',
  align = 'left',
  className = '',
  itemClassName = '',
  labelClassName = '',
  titleClassName = '',
  descriptionClassName = '',
  titleSize = 'default',
  as: Tag = 'h2',
  headingId,
}: SectionLabelProps) {
  const colorMap = {
    teal: 'text-teal',
    coral: 'text-coral',
    amber: 'text-amber',
    muted: 'text-muted',
  };

  const alignmentMap = {
    left: 'text-left items-start',
    center: 'text-center items-center mx-auto',
  };

  const sizeMap = {
    default: 'text-section-title mt-4',
    hero: 'text-hero mt-8 max-w-5xl',
  };

  return (
    <div className={cn('flex flex-col', alignmentMap[align], className)}>
      {(number || label) && (
        <p className={cn(
          'font-mono text-label font-bold uppercase tracking-[0.3em]', 
          colorMap[accentColor], 
          itemClassName,
          labelClassName
        )}>
          {number && <span>{number} / </span>}
          {label}
        </p>
      )}
      
      <Tag
        id={headingId}
        className={cn(
          'font-display font-bold leading-[1.05] tracking-tight text-foreground',
          sizeMap[titleSize],
          itemClassName,
          titleClassName
        )}
      >
        {title}
      </Tag>

      {description && (
        <p className={cn(
          'font-medium text-muted leading-[1.6]',
          titleSize === 'hero' ? 'mt-8 max-w-2xl text-body-lg' : 'mt-4 max-w-md text-body',
          itemClassName,
          descriptionClassName
        )}>
          {description}
        </p>
      )}
    </div>
  );
}
