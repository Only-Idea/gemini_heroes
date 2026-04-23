'use client';

import { InputHTMLAttributes, forwardRef, useId } from 'react';
import { cn } from '@/lib/utils';

interface FloatingInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  containerClassName?: string;
}

const FloatingInput = forwardRef<HTMLInputElement, FloatingInputProps>(
  function FloatingInput(
    { label, error, className = '', containerClassName = '', id, ...rest },
    ref
  ) {
    const generatedId = useId();
    const inputId = id ?? generatedId;
    const hasError = Boolean(error);

    return (
      <div className={cn('group relative', containerClassName)}>
        <input
          ref={ref}
          id={inputId}
          placeholder=" "
          aria-invalid={hasError || undefined}
          aria-describedby={hasError ? `${inputId}-error` : undefined}
          className={cn(
            'peer h-14 w-full rounded-xl border bg-foreground/[0.02] px-4 pt-5 text-sm text-foreground transition-colors',
            'outline-none focus:border-coral',
            hasError ? 'border-coral/70' : 'border-foreground/15 hover:border-foreground/30',
            className
          )}
          {...rest}
        />
        <label
          htmlFor={inputId}
          className={cn(
            'pointer-events-none absolute left-4 top-4 origin-left text-sm text-muted transition-all duration-200',
            // Floating when filled or focused.
            'peer-focus:top-1.5 peer-focus:scale-75 peer-focus:text-foreground',
            'peer-[:not(:placeholder-shown)]:top-1.5 peer-[:not(:placeholder-shown)]:scale-75 peer-[:not(:placeholder-shown)]:text-foreground',
            hasError && 'peer-focus:text-coral peer-[:not(:placeholder-shown)]:text-coral'
          )}
        >
          {label}
        </label>
        {hasError && (
          <p
            id={`${inputId}-error`}
            className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.28em] text-coral"
          >
            {error}
          </p>
        )}
      </div>
    );
  }
);

export default FloatingInput;
