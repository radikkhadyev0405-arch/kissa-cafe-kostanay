import { useState } from 'react';
import { Coffee } from 'lucide-react';

interface SmartImageProps {
  src: string | null;
  alt: string;
  className?: string;
  label?: string;
}

export function SmartImage({ src, alt, className = '', label }: SmartImageProps) {
  const [error, setError] = useState(false);

  if (!src || error) {
    return (
      <div
        className={`flex items-center justify-center bg-gradient-to-br from-kissa-pink-light to-kissa-pink ${className}`}
        aria-label={alt}
        role="img"
      >
        <Coffee className="text-white/70" size={28} aria-hidden="true" />
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      onError={() => setError(true)}
      className={className}
    />
  );
}
