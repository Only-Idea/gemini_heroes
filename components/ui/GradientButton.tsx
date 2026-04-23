'use client';

import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface GradientButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'ghost';
  size?: 'default' | 'lg';
}

const GradientButton = forwardRef<HTMLButtonElement, GradientButtonProps>(
  function GradientButton(
    { variant = 'primary', size = 'default', className = '', children, ...rest },
    ref
  ) {
    const base =
      'relative inline-flex items-center justify-center rounded-full font-medium tracking-tight transition-all duration-[400ms] will-change-transform active:translate-y-0 active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-4 focus-visible:ring-offset-background focus-visible:ring-coral';

    const sizeStyles = {
      default: 'h-12 px-6 text-sm',
      lg: 'h-14 px-8 text-base',
    } as const;

    const variantStyles = {
      primary:
        'text-white shadow-heroes bg-gradient-heroes bg-[length:200%_200%] bg-[position:0%_50%] hover:bg-[position:100%_50%] hover:-translate-y-0.5 hover:shadow-[0_18px_40px_-12px_rgba(236,122,92,0.55)]',
      ghost:
        'border border-foreground/25 text-foreground hover:border-foreground/60 hover:-translate-y-0.5',
    } as const;

    return (
      <button
        ref={ref}
        className={cn(base, sizeStyles[size], variantStyles[variant], className)}
        {...rest}
      >
        {children}
      </button>
    );
  }
);

export default GradientButton;
