/**
 * Normalizes class names by joining them with single spaces and removing extra whitespace.
 * This helps prevent React hydration mismatches caused by template literal formatting.
 */
export function cn(...classes: (string | undefined | null | boolean | Record<string, boolean>)[]) {
  return classes
    .filter(Boolean)
    .map((c) => {
      if (typeof c === 'string') return c.trim();
      if (typeof c === 'object' && c !== null) {
        return Object.entries(c)
          .filter(([, value]) => value)
          .map(([key]) => key.trim())
          .join(' ');
      }
      return '';
    })
    .join(' ')
    .replace(/\s+/g, ' ')
    .trim();
}
