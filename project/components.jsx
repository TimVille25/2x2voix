/* global React */

// ============================================================
// Icons
// ============================================================
const Icon = ({ name, size = 16, stroke = 1.6 }) => {
  const common = { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: stroke, strokeLinecap: "round", strokeLinejoin: "round" };
  switch (name) {
    case "calendar":
      return (
        <svg {...common}>
          <rect x="3" y="5" width="18" height="16" rx="2"></rect>
          <path d="M3 9h18M8 3v4M16 3v4"></path>
        </svg>
      );
    case "map-pin":
      return (
        <svg {...common}>
          <path d="M12 22s7-7.5 7-13a7 7 0 1 0-14 0c0 5.5 7 13 7 13z"></path>
          <circle cx="12" cy="9" r="2.5"></circle>
        </svg>
      );
    case "clock":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9"></circle>
          <path d="M12 7v5l3 2"></path>
        </svg>
      );
    case "ticket":
      return (
        <svg {...common}>
          <path d="M3 8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v2a2 2 0 0 0 0 4v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2a2 2 0 0 0 0-4z"></path>
          <path d="M12 6v12" strokeDasharray="2 3"></path>
        </svg>
      );
    case "arrow-right":
      return (
        <svg {...common}>
          <path d="M5 12h14M13 6l6 6-6 6"></path>
        </svg>
      );
    case "download":
      return (
        <svg {...common}>
          <path d="M12 4v12m0 0l-4-4m4 4l4-4M5 20h14"></path>
        </svg>
      );
    case "play":
      return (
        <svg {...common} fill="currentColor" stroke="none">
          <path d="M7 5.5v13a1 1 0 0 0 1.5.87l11-6.5a1 1 0 0 0 0-1.74l-11-6.5A1 1 0 0 0 7 5.5z"></path>
        </svg>
      );
    case "pause":
      return (
        <svg {...common} fill="currentColor" stroke="none">
          <rect x="7" y="5" width="3.5" height="14" rx="1"></rect>
          <rect x="13.5" y="5" width="3.5" height="14" rx="1"></rect>
        </svg>
      );
    case "mail":
      return (
        <svg {...common}>
          <rect x="3" y="5" width="18" height="14" rx="2"></rect>
          <path d="M3 7l9 6 9-6"></path>
        </svg>
      );
    case "phone":
      return (
        <svg {...common}>
          <path d="M5 4h3l2 5-2.5 1.5a11 11 0 0 0 6 6L15 14l5 2v3a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z"></path>
        </svg>
      );
    case "check":
      return (
        <svg {...common}>
          <path d="M5 12l5 5 9-11"></path>
        </svg>
      );
    case "instagram":
      return (
        <svg {...common}>
          <rect x="3" y="3" width="18" height="18" rx="5"></rect>
          <circle cx="12" cy="12" r="4"></circle>
          <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor"></circle>
        </svg>
      );
    default: return null;
  }
};

// ============================================================
// Stylised portrait placeholder (SVG) — elegant, abstract.
// Two variants: feminine / masculine silhouette, distinguished
// by hair/shoulders. Each gets a unique hue seed.
// ============================================================
const Portrait = ({ initials, voice, duo, seed = 0 }) => {
  // Subtle parchment-toned palette, each member slightly distinct.
  const palettes = [
    { bg: "#EDE9E0", fg: "#2C5242", accent: "#C4722A" }, // soprano
    { bg: "#E4DAC8", fg: "#1C3228", accent: "#B85C1E" }, // alto
    { bg: "#E8E2D4", fg: "#2C5242", accent: "#5A8C78" }, // tenor
    { bg: "#DED4C0", fg: "#1C3228", accent: "#C4722A" }, // basse
  ];
  const p = palettes[seed % palettes.length];
  const isFeminine = duo === "F";
  return (
    <svg viewBox="0 0 100 130" preserveAspectRatio="xMidYMid slice" className="portrait-art" aria-hidden="true">
      <rect width="100" height="130" fill={p.bg} />
      {/* abstract staff lines on background */}
      <g stroke={p.fg} strokeOpacity="0.07" strokeWidth="0.6">
        <line x1="0" y1="22" x2="100" y2="22" />
        <line x1="0" y1="30" x2="100" y2="30" />
        <line x1="0" y1="38" x2="100" y2="38" />
        <line x1="0" y1="46" x2="100" y2="46" />
        <line x1="0" y1="54" x2="100" y2="54" />
      </g>
      {/* shoulders */}
      <path
        d={isFeminine
          ? "M 8 130 Q 8 96 28 86 L 50 80 L 72 86 Q 92 96 92 130 Z"
          : "M 4 130 Q 4 92 24 84 L 50 78 L 76 84 Q 96 92 96 130 Z"}
        fill={p.fg}
      />
      {/* neck */}
      <path d="M 42 84 Q 42 78 50 76 Q 58 78 58 84 Z" fill={p.bg} opacity="0.5" />
      {/* head */}
      <ellipse cx="50" cy="58" rx={isFeminine ? 17 : 18} ry={isFeminine ? 21 : 22} fill={p.bg} stroke={p.fg} strokeOpacity="0.3" strokeWidth="0.8" />
      {/* hair */}
      {isFeminine ? (
        <path d="M 30 52 Q 28 32 50 32 Q 72 32 70 52 Q 72 64 68 70 Q 68 50 50 46 Q 32 50 32 70 Q 28 64 30 52 Z" fill={p.fg} opacity="0.9" />
      ) : (
        <path d="M 34 46 Q 36 36 50 36 Q 64 36 66 46 Q 66 52 64 52 Q 58 44 50 44 Q 42 44 36 52 Q 34 52 34 46 Z" fill={p.fg} opacity="0.9" />
      )}
      {/* initials glyph in subtle position */}
      <text x="50" y="118" textAnchor="middle" fontFamily="'New York', 'Source Serif 4', Georgia, serif" fontSize="11" fill={p.bg} opacity="0.85" letterSpacing="0.5">
        {initials}
      </text>
      {/* voice tick mark */}
      <circle cx="86" cy="14" r="2.5" fill={p.accent} />
      <text x="80" y="17" textAnchor="end" fontFamily="-apple-system,sans-serif" fontSize="6" fill={p.fg} opacity="0.6" letterSpacing="1">
        {voice && voice[0].toUpperCase()}
      </text>
    </svg>
  );
};

// ============================================================
// Member chip (for duo cards)
// ============================================================
const Member = ({ m, idx }) => (
  <div className="member">
    <div className="member__avatar member__avatar--svg">
      <Portrait initials={m.initials} voice={m.voice} duo={m.duo} seed={idx} />
    </div>
    <div className="member__info">
      <div className="member__name">{m.first} {m.last}</div>
      <div className="member__voice">{m.voice}</div>
    </div>
  </div>
);

// ============================================================
// Song row
// ============================================================
const Song = ({ s }) => (
  <article className="song">
    <div className="song__era">{s.era}</div>
    <div className="song__body">
      <div className="song__title">{s.title}</div>
      <div className="song__composer">{s.composer}</div>
    </div>
    <div className={`song__tag song__tag--${s.tag}`}>{s.tagLabel}</div>
  </article>
);

// ============================================================
// Event card with .ics download
// ============================================================
const buildICS = (event) => {
  const start = event.date.replace(/-/g, "") + "T" + event.time.replace(":", "") + "00";
  const [Y, M, D] = event.date.split("-").map(Number);
  const [h, mi] = event.time.split(":").map(Number);
  const endDate = new Date(Date.UTC(Y, M - 1, D, h, mi));
  endDate.setUTCMinutes(endDate.getUTCMinutes() + event.duration);
  const pad = (n) => String(n).padStart(2, "0");
  const end = `${endDate.getUTCFullYear()}${pad(endDate.getUTCMonth()+1)}${pad(endDate.getUTCDate())}T${pad(endDate.getUTCHours())}${pad(endDate.getUTCMinutes())}00`;
  const dtstamp = new Date().toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
  const escape = (s) => s.replace(/[,;]/g, (m) => "\\" + m).replace(/\n/g, "\\n");
  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//2x2 Voix//Site//FR",
    "BEGIN:VEVENT",
    `UID:${event.id}@2x2voix`,
    `DTSTAMP:${dtstamp}`,
    `DTSTART;TZID=Europe/Paris:${start}`,
    `DTEND;TZID=Europe/Paris:${end}`,
    `SUMMARY:2x2 Voix — ${escape(event.title)}`,
    `LOCATION:${escape(event.venue + ", " + event.address)}`,
    `DESCRIPTION:${escape(event.note)}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
};

const downloadICS = (event) => {
  const ics = buildICS(event);
  const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `2x2voix-${event.id}.ics`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
};

const EventCard = ({ event }) => (
  <article className="event">
    <div className="event__date">
      <div className="event__date-day">{event.day}</div>
      <div className="event__date-month">{event.month.slice(0,3)}.</div>
      <div className="event__date-year">{event.year}</div>
    </div>
    <div className="event__info">
      <h3 className="event__title">{event.title}</h3>
      <div className="event__meta">
        <span className="event__meta-item"><Icon name="map-pin" size={14} /> {event.venue}</span>
        <span className="event__meta-item"><Icon name="clock" size={14} /> {event.time}</span>
        <span className="event__meta-item"><Icon name="ticket" size={14} /> {event.price}</span>
      </div>
      <p className="event__note">{event.note}</p>
    </div>
    <div className="event__actions">
      <button className="btn btn--secondary btn--sm" onClick={() => downloadICS(event)}>
        <Icon name="download" size={14} /> Ajouter à mon agenda
      </button>
    </div>
  </article>
);

// ============================================================
// Audio track (fake playback — animated progress)
// ============================================================
const Track = ({ track, isPlaying, onToggle, progress }) => {
  const fmt = (s) => {
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${String(sec).padStart(2, "0")}`;
  };
  const pct = Math.min(100, (progress / track.duration) * 100);
  return (
    <article className={`track ${isPlaying ? "is-playing" : ""}`}>
      <div className="track__head">
        <button className={`track__play ${isPlaying ? "is-playing" : ""}`} onClick={onToggle} aria-label={isPlaying ? "Pause" : "Lecture"}>
          <Icon name={isPlaying ? "pause" : "play"} size={18} />
        </button>
        <div className="track__info">
          <div className="track__title">{track.title}</div>
          <div className="track__sub">{track.sub}</div>
        </div>
      </div>
      <div className="track__bar">
        <div className="track__bar-fill" style={{ width: `${pct}%` }}></div>
      </div>
      <div className="track__time">
        <span>{fmt(progress)}</span>
        <span>{fmt(track.duration)}</span>
      </div>
    </article>
  );
};

// ============================================================
// Gallery item (placeholder)
// ============================================================
const GalleryItem = ({ item, idx }) => {
  // Generate a subtle abstract gradient as placeholder
  const seeds = [
    "linear-gradient(135deg, #2C5242 0%, #5A8C78 100%)",
    "linear-gradient(160deg, #C4722A 0%, #7A3F18 100%)",
    "linear-gradient(135deg, #1C3228 0%, #2C5242 100%)",
    "linear-gradient(120deg, #5A4A2E 0%, #2C5242 100%)",
    "linear-gradient(150deg, #B85C1E 0%, #2C5242 100%)",
    "linear-gradient(135deg, #2C5242 0%, #1C3228 100%)",
  ];
  return (
    <div
      className={`gallery__item ${item.layout === "wide" ? "gallery__item--wide" : ""} ${item.layout === "tall" ? "gallery__item--tall" : ""}`}
      style={{ background: seeds[idx % seeds.length] }}
    >
      <div className="gallery__placeholder">photo · {String(idx + 1).padStart(2, "0")}</div>
      <div className="gallery__caption">{item.label}</div>
    </div>
  );
};

// expose
Object.assign(window, { Icon, Portrait, Member, Song, EventCard, Track, GalleryItem, downloadICS });
