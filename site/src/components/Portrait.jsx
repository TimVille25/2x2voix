const PALETTES = [
  { bg: "#EDE9E0", fg: "#2C5242", accent: "#C4722A" },
  { bg: "#E4DAC8", fg: "#1C3228", accent: "#B85C1E" },
  { bg: "#E8E2D4", fg: "#2C5242", accent: "#5A8C78" },
  { bg: "#DED4C0", fg: "#1C3228", accent: "#C4722A" },
];

export const Portrait = ({ initials, voice, duo, seed = 0 }) => {
  const p = PALETTES[seed % PALETTES.length];
  const isF = duo === "F";
  return (
    <svg viewBox="0 0 100 130" preserveAspectRatio="xMidYMid slice" className="portrait-art" aria-hidden="true">
      <rect width="100" height="130" fill={p.bg} />
      <g stroke={p.fg} strokeOpacity="0.07" strokeWidth="0.6">
        <line x1="0" y1="22" x2="100" y2="22" />
        <line x1="0" y1="30" x2="100" y2="30" />
        <line x1="0" y1="38" x2="100" y2="38" />
        <line x1="0" y1="46" x2="100" y2="46" />
        <line x1="0" y1="54" x2="100" y2="54" />
      </g>
      <path
        d={isF
          ? "M 8 130 Q 8 96 28 86 L 50 80 L 72 86 Q 92 96 92 130 Z"
          : "M 4 130 Q 4 92 24 84 L 50 78 L 76 84 Q 96 92 96 130 Z"}
        fill={p.fg}
      />
      <path d="M 42 84 Q 42 78 50 76 Q 58 78 58 84 Z" fill={p.bg} opacity="0.5" />
      <ellipse
        cx="50" cy="58"
        rx={isF ? 17 : 18} ry={isF ? 21 : 22}
        fill={p.bg} stroke={p.fg} strokeOpacity="0.3" strokeWidth="0.8"
      />
      {isF ? (
        <path d="M 30 52 Q 28 32 50 32 Q 72 32 70 52 Q 72 64 68 70 Q 68 50 50 46 Q 32 50 32 70 Q 28 64 30 52 Z" fill={p.fg} opacity="0.9" />
      ) : (
        <path d="M 34 46 Q 36 36 50 36 Q 64 36 66 46 Q 66 52 64 52 Q 58 44 50 44 Q 42 44 36 52 Q 34 52 34 46 Z" fill={p.fg} opacity="0.9" />
      )}
      <text x="50" y="118" textAnchor="middle" fontFamily="'New York', 'Source Serif 4', Georgia, serif" fontSize="11" fill={p.bg} opacity="0.85" letterSpacing="0.5">
        {initials}
      </text>
      <circle cx="86" cy="14" r="2.5" fill={p.accent} />
      <text x="80" y="17" textAnchor="end" fontFamily="-apple-system,sans-serif" fontSize="6" fill={p.fg} opacity="0.6" letterSpacing="1">
        {voice && voice[0].toUpperCase()}
      </text>
    </svg>
  );
};

export const PortraitInline = ({ m, idx }) => {
  const p = PALETTES[idx % PALETTES.length];
  const isF = m.duo === "F";
  return (
    <>
      <rect width="100" height="130" fill={p.bg} />
      <g stroke={p.fg} strokeOpacity="0.08" strokeWidth="0.6">
        <line x1="0" y1="22" x2="100" y2="22" />
        <line x1="0" y1="30" x2="100" y2="30" />
        <line x1="0" y1="38" x2="100" y2="38" />
        <line x1="0" y1="46" x2="100" y2="46" />
        <line x1="0" y1="54" x2="100" y2="54" />
      </g>
      <path
        d={isF
          ? "M 8 130 Q 8 96 28 86 L 50 80 L 72 86 Q 92 96 92 130 Z"
          : "M 4 130 Q 4 92 24 84 L 50 78 L 76 84 Q 96 92 96 130 Z"}
        fill={p.fg}
      />
      <ellipse cx="50" cy="58" rx={isF ? 17 : 18} ry={isF ? 21 : 22} fill={p.bg} stroke={p.fg} strokeOpacity="0.3" strokeWidth="0.8" />
      {isF
        ? <path d="M 30 52 Q 28 32 50 32 Q 72 32 70 52 Q 72 64 68 70 Q 68 50 50 46 Q 32 50 32 70 Q 28 64 30 52 Z" fill={p.fg} opacity="0.92" />
        : <path d="M 34 46 Q 36 36 50 36 Q 64 36 66 46 Q 66 52 64 52 Q 58 44 50 44 Q 42 44 36 52 Q 34 52 34 46 Z" fill={p.fg} opacity="0.92" />
      }
      <text x="50" y="120" textAnchor="middle" fontFamily="'New York', serif" fontSize="9" fill={p.bg} opacity="0.85" letterSpacing="1.5">
        {m.first.toUpperCase()}
      </text>
      <circle cx="86" cy="14" r="2.5" fill={p.accent} />
      <text x="80" y="17" textAnchor="end" fontFamily="-apple-system,sans-serif" fontSize="6" fill={p.fg} opacity="0.7" letterSpacing="1">
        {m.voice[0].toUpperCase()}
      </text>
    </>
  );
};
