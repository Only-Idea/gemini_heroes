'use client';

import { useMemo } from 'react';
import { cn } from '@/lib/utils';

interface QRCodeProps {
  /** Matrix size (cells per side). Default 21 (QR v1 sized). */
  size?: number;
  className?: string;
}

/**
 * Decorative QR-style code with Heroes gradient framing. Renders a
 * deterministic cell pattern plus the three signature finder squares
 * (top-left, top-right, bottom-left). This is intentionally a visual
 * placeholder — swap for a real `qrcode` encoder when App Store URLs
 * are finalised.
 */
export default function QRCode({ size = 21, className = '' }: QRCodeProps) {
  const cells = useMemo(() => generateCells(size), [size]);

  return (
    <div
      className={cn(
        'relative inline-block rounded-2xl p-[3px] bg-gradient-heroes bg-[length:200%_200%] shadow-heroes [animation:hero-shimmer_8s_ease-in-out_infinite]',
        className
      )}
    >
      <div className="rounded-[14px] bg-white p-4">
        <svg
          viewBox={`0 0 ${size} ${size}`}
          shapeRendering="crispEdges"
          className="block h-40 w-40"
          aria-label="Download Heroes — scan to open the app"
          role="img"
        >
          {/* Data cells */}
          {cells.map(({ x, y }) => (
            <rect key={`${x}-${y}`} x={x} y={y} width={1} height={1} fill="currentColor" />
          ))}
          {/* Three finder patterns (corners) */}
          <FinderSquare ox={0} oy={0} />
          <FinderSquare ox={size - 7} oy={0} />
          <FinderSquare ox={0} oy={size - 7} />
        </svg>
      </div>
    </div>
  );
}

function FinderSquare({ ox, oy }: { ox: number; oy: number }) {
  return (
    <g transform={`translate(${ox}, ${oy})`}>
      {/* outer 7x7 */}
      <rect x={0} y={0} width={7} height={1} />
      <rect x={0} y={6} width={7} height={1} />
      <rect x={0} y={0} width={1} height={7} />
      <rect x={6} y={0} width={1} height={7} />
      {/* inner 3x3 */}
      <rect x={2} y={2} width={3} height={3} />
    </g>
  );
}

// Seeded RNG keeps the pattern deterministic given `size` so useMemo is pure.
function generateCells(size: number) {
  let s = size * 9301 + 49297;
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
