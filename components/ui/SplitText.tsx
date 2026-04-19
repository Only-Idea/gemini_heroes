'use client';

interface SplitTextProps {
  children: string;
  className?: string;
}

export default function SplitText({ children, className = '' }: SplitTextProps) {
  const characters = children.split('');

  return (
    <span className={`inline-block ${className}`} aria-label={children}>
      {characters.map((char, index) => (
        <span
          key={index}
          className="char inline-block"
          style={{ whiteSpace: char === ' ' ? 'pre' : 'normal' }}
          aria-hidden="true"
        >
          {char}
        </span>
      ))}
    </span>
  );
}
