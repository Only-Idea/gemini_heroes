'use client';

import { useMemo } from 'react';
import { cn } from '@/lib/utils';

interface QRCodeProps {
  /** Matrix size (cells per side). Default 21 (QR v1 sized). */
  size?: number;
  /** Store-specific center glyph. `heroes` is the default neutral mark. */
  store?: 'apple' | 'google' | 'heroes';
  /** Caption under the QR. Passed in so it can be localised by the caller. */
  caption?: string;
  className?: string;
}

/**
 * Decorative QR-style code with Heroes gradient framing. Renders a
 * deterministic cell pattern plus the three signature finder squares
 * (top-left, top-right, bottom-left) and a centre logo cutout for
 * Apple / Google / Heroes. This is a visual placeholder — swap for a
 * real encoder when App Store URLs are finalised.
 */
export default function QRCode({
  size = 21,
  store = 'heroes',
  caption,
  className = '',
}: QRCodeProps) {
  // Seed differs per store so patterns look different per badge.
  const seed = size * 9301 + (store === 'apple' ? 17 : store === 'google' ? 31 : 7);
  const cells = useMemo(() => generateCells(size, seed), [size, seed]);

  return (
    <div className={cn('inline-flex flex-col items-center gap-2', className)}>
      <div className="relative inline-block rounded-2xl p-[3px] bg-gradient-heroes bg-[length:200%_200%] shadow-heroes [animation:hero-shimmer_8s_ease-in-out_infinite]">
        <div className="relative rounded-[14px] bg-white p-4">
          <svg
            viewBox={`0 0 ${size} ${size}`}
            shapeRendering="crispEdges"
            className="block h-40 w-40"
            aria-label={caption ?? 'Download Heroes — scan to open'}
            role="img"
          >
            {/* Data cells */}
            {cells.map(({ x, y }) => (
              <rect key={`${x}-${y}`} x={x} y={y} width={1} height={1} fill="currentColor" />
            ))}
            {/* Finder patterns (corners) */}
            <FinderSquare ox={0} oy={0} />
            <FinderSquare ox={size - 7} oy={0} />
            <FinderSquare ox={0} oy={size - 7} />
          </svg>
          {/* Centre logo cutout */}
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white shadow-[0_0_0_3px_rgba(255,255,255,1)]">
              <CenterGlyph store={store} />
            </div>
          </div>
        </div>
      </div>
      {caption && (
        <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-muted">{caption}</p>
      )}
    </div>
  );
}

function FinderSquare({ ox, oy }: { ox: number; oy: number }) {
  return (
    <g transform={`translate(${ox}, ${oy})`}>
      <rect x={0} y={0} width={7} height={1} />
      <rect x={0} y={6} width={7} height={1} />
      <rect x={0} y={0} width={1} height={7} />
      <rect x={6} y={0} width={1} height={7} />
      <rect x={2} y={2} width={3} height={3} />
    </g>
  );
}

function CenterGlyph({ store }: { store: 'apple' | 'google' | 'heroes' }) {
  if (store === 'apple') {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6 text-foreground">
        <path d="M16.5 1.5c0 1.2-.5 2.3-1.3 3.1-.9.9-2.2 1.6-3.3 1.5-.1-1.1.4-2.3 1.2-3.1.9-.9 2.2-1.5 3.4-1.5zM20 17.8c-.5 1.1-1.1 2.2-1.9 3.1-1 1.2-2 2-3.4 2-1.3 0-1.8-.8-3.3-.8-1.6 0-2.1.8-3.4.9-1.3 0-2.4-1.1-3.3-2.2C2 18.6 1.2 14.4 3 11.6c.9-1.4 2.3-2.2 3.9-2.2 1.3 0 2.5.8 3.3.8.7 0 2.3-1 3.9-.8.7 0 2.6.3 3.9 2.1-.1 0-2.3 1.3-2.3 4 0 3.1 2.7 4.1 2.3 2.3z" />
      </svg>
    );
  }
  if (store === 'google') {
    return (
      <svg viewBox="0 0 24 24" className="h-6 w-6">
        <defs>
          <linearGradient id="qrc-play" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#375E65" />
            <stop offset="1" stopColor="#F2BE5E" />
          </linearGradient>
        </defs>
        <path
          fill="url(#qrc-play)"
          d="M3.5 2.5 14.3 12 3.5 21.5c-.3-.2-.5-.5-.5-.9V3.4c0-.4.2-.7.5-.9z"
        />
        <path fill="#EC7A5C" d="M17.7 8.6 14.3 12l3.4 3.4 2.7-1.5c1-.6 1-2.1 0-2.7z" />
        <path fill="#F2BE5E" d="m14.3 12-10.8 9.5c.3.2.7.2 1 0l10.2-5.8z" />
        <path fill="#375E65" d="M14.3 12 4.5 2.7c-.3-.2-.7-.2-1 0l10.8 9.3z" />
      </svg>
    );
  }
  return (
    <div className="flex h-6 w-6 items-center justify-center rounded-md bg-gradient-heroes p-[2px]">
      <div className="flex h-full w-full items-center justify-center rounded-[4px] bg-background">
        <span className="font-display text-xs font-bold text-foreground">H</span>
      </div>
    </div>
  );
}

// Seeded RNG keeps the pattern deterministic given `size` + `seed` so useMemo is pure.
function generateCells(size: number, seed: number) {
  let s = seed || 1;
  const rand = () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
  const isFinderZone = (x: number, y: number) =>
    (x < 8 && y < 8) || (x >= size - 8 && y < 8) || (x < 8 && y >= size - 8);

  const cells: { x: number; y: number }[] = [];
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      if (isFinderZone(x, y)) continue;
      if (rand() > 0.55) cells.push({ x, y });
    }
  }
  return cells;
}
