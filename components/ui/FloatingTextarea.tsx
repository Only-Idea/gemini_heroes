'use client';

import { TextareaHTMLAttributes, forwardRef, useId } from 'react';
import { cn } from '@/lib/utils';

interface FloatingTextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
  containerClassName?: string;
}

const FloatingTextarea = forwardRef<HTMLTextAreaElement, FloatingTextareaProps>(
  function FloatingTextarea(
    { label, error, className = '', containerClassName = '', id, rows = 5, ...rest },
    ref
  ) {
    const generatedId = useId();
    const fieldId = id ?? generatedId;
    const hasError = Boolean(error);

    return (
      <div className={cn('group relative', containerClassName)}>
        <textarea
          ref={ref}
          id={fieldId}
          rows={rows}
          placeholder=" "
          aria-invalid={hasError || undefined}
          aria-describedby={hasError ? `${fieldId}-error` : undefined}
          className={cn(
            'peer w-full rounded-xl border bg-foreground/[0.02] px-4 pt-6 pb-3 text-sm text-foreground transition-colors',
            'outline-none focus:border-coral resize-y',
            hasError ? 'border-coral/70' : 'border-foreground/15 hover:border-foreground/30',
            className
          )}
          {...rest}
        />
        <label
          htmlFor={fieldId}
          className={cn(
            'pointer-events-none absolute left-4 top-4 origin-left text-sm text-muted transition-all duration-200',
            'peer-focus:top-1.5 peer-focus:scale-75 peer-focus:text-foreground',
            'peer-[:not(:placeholder-shown)]:top-1.5 peer-[:not(:placeholder-shown)]:scale-75 peer-[:not(:placeholder-shown)]:text-foreground',
            hasError && 'peer-focus:text-coral peer-[:not(:placeholder-shown)]:text-coral'
          )}
        >
          {label}
        </label>
        {hasError && (
          <p
            id={`${fieldId}-error`}
            className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.28em] text-coral"
          >
            {error}
          </p>
        )}
      </div>
    );
  }
);

export default FloatingTextarea;
