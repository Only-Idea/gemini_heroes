'use client';

import { ButtonHTMLAttributes, AnchorHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

type CommonProps = {
  variant?: 'primary' | 'ghost';
  size?: 'default' | 'lg';
  className?: string;
  children?: React.ReactNode;
};

type ButtonOnlyProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof CommonProps> & {
  href?: undefined;
};
type AnchorOnlyProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof CommonProps> & {
  href: string;
};

type GradientButtonProps = CommonProps & (ButtonOnlyProps | AnchorOnlyProps);

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

const GradientButton = forwardRef<HTMLButtonElement | HTMLAnchorElement, GradientButtonProps>(
  function GradientButton(props, ref) {
    const { variant = 'primary', size = 'default', className = '', children, ...rest } = props;
    const composed = cn(base, sizeStyles[size], variantStyles[variant], className);

    if ('href' in rest && rest.href) {
      return (
        <a
          ref={ref as React.Ref<HTMLAnchorElement>}
          className={composed}
          {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}
        >
          {children}
        </a>
      );
    }

    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        className={composed}
        {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}
      >
        {children}
      </button>
    );
  }
);

export default GradientButton;
