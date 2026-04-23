'use client';

import { FormEvent, useState } from 'react';
import { useTranslations } from 'next-intl';
import FloatingInput from '@/components/ui/FloatingInput';
import FloatingTextarea from '@/components/ui/FloatingTextarea';

type Status = 'idle' | 'submitting' | 'success' | 'error';

interface FieldErrors {
  name?: string;
  email?: string;
  message?: string;
}

export default function ContactForm() {
  const t = useTranslations('contact');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>('idle');

  const validate = (): FieldErrors => {
    const next: FieldErrors = {};
    if (!name.trim()) next.name = 'Required';
    if (!email.trim()) {
      next.email = 'Required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      next.email = 'Invalid email';
    }
    if (!message.trim()) next.message = 'Required';
    else if (message.trim().length < 8) next.message = 'Too short';
    return next;
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const next = validate();
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    setStatus('submitting');
    try {
      // Mocked endpoint — replace with real submission wiring later.
      await new Promise((r) => setTimeout(r, 1200));
      setStatus('success');
      setName('');
      setEmail('');
      setMessage('');
    } catch {
      setStatus('error');
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="relative flex flex-col gap-5 rounded-3xl border border-white/20 bg-white/40 p-6 shadow-heroes backdrop-blur-md lg:p-10"
      aria-busy={status === 'submitting'}
    >
      <FloatingInput
        label={t('name')}
        name="name"
        autoComplete="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        error={errors.name}
        disabled={status === 'submitting'}
      />
      <FloatingInput
        label={t('email')}
        type="email"
        name="email"
        autoComplete="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={errors.email}
        disabled={status === 'submitting'}
      />
      <FloatingTextarea
        label={t('message')}
        name="message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        error={errors.message}
        disabled={status === 'submitting'}
      />

      <button
        type="submit"
        disabled={status === 'submitting' || status === 'success'}
        className="group relative inline-flex h-13 items-center justify-center gap-3 self-start overflow-hidden rounded-full bg-gradient-heroes bg-[length:200%_200%] bg-[position:0%_50%] px-8 py-3 font-medium text-white shadow-heroes transition-all duration-400 hover:-translate-y-0.5 hover:bg-[position:100%_50%] hover:shadow-[0_18px_40px_-12px_rgba(236,122,92,0.55)] disabled:cursor-not-allowed disabled:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral focus-visible:ring-offset-4 focus-visible:ring-offset-background"
      >
        {status === 'submitting' && <Spinner />}
        {status === 'success' && <CheckMark />}
        <span>{status === 'success' ? 'Sent — Thank you' : t('submit')}</span>
      </button>

      {status === 'error' && (
        <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-coral">
          Something went wrong — please try again.
        </p>
      )}

      {/* Live region for assistive tech */}
      <span className="sr-only" aria-live="polite">
        {status === 'submitting' ? 'Sending…' : status === 'success' ? 'Message sent.' : ''}
      </span>
    </form>
  );
}

function Spinner() {
  return (
    <span className="relative flex h-5 w-5">
      <span className="absolute inset-0 rounded-full border-2 border-white/30" />
      <span className="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-t-white" />
    </span>
  );
}

function CheckMark() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5 animate-[hero-rise_0.4s_ease-out_both]"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 12l4.5 4.5L19 7" />
    </svg>
  );
}
