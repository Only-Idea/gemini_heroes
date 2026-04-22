'use client';

import { ReactNode, ElementType, forwardRef, CSSProperties } from 'react';
import { cn } from '@/lib/utils';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  variant?: 'default' | 'subtle' | 'accent';
  glowColor?: 'teal' | 'coral' | 'amber';
  hoverEffect?: 'scale' | 'glow' | 'none';
  span?: string;
  as?: ElementType;
  style?: CSSProperties;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any; // Allow for element-specific props
}

/**
 * A reusable crystalline card component.
 * Supports various surface variants, hover effects, and polymorphic tags.
 */
const GlassCard = forwardRef<HTMLElement, GlassCardProps>(
  (
    {
      children,
      className = '',
      variant = 'default',
      glowColor,
      hoverEffect = 'none',
      span = '',
      as: Tag = 'div',
      style,
      ...props
    },
    ref
  ) => {
    const variantStyles = {
      default: 'glass border-white/20',
      subtle: 'bg-white/5 backdrop-blur-md border border-white/10 shadow-sm',
      accent: 'glass border-white/40 shadow-heroes',
    };

    const hoverStyles = {
      none: '',
      scale: 'transition-transform duration-500 hover:scale-[1.02] hover:shadow-2xl',
      glow: `transition-all duration-500 hover:shadow-[0_0_30px_rgba(var(--glow-rgb),0.2)] hover:border-white/40`,
    };

    // Map glowColor to CSS variable for custom glow effects
    const glowVars: Record<string, string> = {
      teal: '0, 200, 200',
      coral: '236, 122, 92',
      amber: '242, 190, 94',
    };

    const mergedStyle = glowColor 
      ? { '--glow-rgb': glowVars[glowColor], ...style } as CSSProperties 
      : style;

    // Use a variable for the Tag to avoid TS complex polymorphic errors while maintaining functionality
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const Component = Tag as any;

    return (
      <Component 
        ref={ref}
        style={mergedStyle}
        className={cn(
          'relative overflow-hidden rounded-[24px] p-8 lg:p-10',
          variantStyles[variant as keyof typeof variantStyles],
          hoverStyles[hoverEffect as keyof typeof hoverStyles],
          span,
          className
        )}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

GlassCard.displayName = 'GlassCard';

export default GlassCard;
