'use client';

interface SplitTextProps {
  children: string;
  className?: string;
}

export default function SplitText({ children, className = '' }: SplitTextProps) {
  const characters = children.split('');

  return (
    <span className={`relative inline-block ${className}`}>
      <span className="sr-only">{children}</span>
      <span aria-hidden="true">
        {characters.map((char, index) => (
          <span
            key={index}
            className="char inline-block"
            style={{ whiteSpace: char === ' ' ? 'pre' : 'normal' }}
          >
            {char}
          </span>
        ))}
      </span>
    </span>
  );
}
