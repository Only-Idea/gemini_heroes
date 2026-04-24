'use client';

import { Leva } from 'leva';

export default function DevTools() {
  const isDev = process.env.NODE_ENV === 'development';

  if (!isDev) return null;

  return (
    <>
      <Leva collapsed />
    </>
  );
}
