export function Starfish({ className = '', color = '#fff' }) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="none" aria-hidden="true">
      <path
        d="M50 4 L61 34 L93 34 L67 54 L77 86 L50 67 L23 86 L33 54 L7 34 L39 34 Z"
        fill={color}
        stroke="#E8559A"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <circle cx="44" cy="42" r="3" fill="#E8559A" opacity="0.5" />
      <circle cx="56" cy="42" r="3" fill="#E8559A" opacity="0.5" />
      <circle cx="50" cy="52" r="3" fill="#E8559A" opacity="0.5" />
      <circle cx="38" cy="55" r="2.5" fill="#E8559A" opacity="0.4" />
      <circle cx="62" cy="55" r="2.5" fill="#E8559A" opacity="0.4" />
    </svg>
  );
}

export function Daisy({ className = '', petalColor = '#fff', centerColor = '#E8559A' }) {
  const petals = Array.from({ length: 8 });
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      {petals.map((_, i) => (
        <ellipse
          key={i}
          cx="50"
          cy="24"
          rx="10"
          ry="20"
          fill={petalColor}
          stroke="#E8559A"
          strokeWidth="1.5"
          transform={`rotate(${i * 45} 50 50)`}
        />
      ))}
      <circle cx="50" cy="50" r="12" fill={centerColor} />
      <circle cx="50" cy="50" r="7" fill="#F9D5E5" />
    </svg>
  );
}
