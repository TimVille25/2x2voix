/* global React, ReactDOM */
/* global MEMBERS, REPERTOIRE, EVENTS, TRACKS, GALLERY */
/* global Icon, Member, Song, EventCard, Track, GalleryItem */
/* global useTweaks, TweaksPanel, TweakSection, TweakRadio, TweakSelect */

const { useState, useEffect, useRef, useMemo } = React;

// ============================================================
// Defaults the user can tweak (EDITMODE-persisted)
// ============================================================
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "heroVariant": "portraits",
  "theme": "default",
  "typo": "modern"
}/*EDITMODE-END*/;

// ============================================================
// Smooth scrollspy
// ============================================================
function useScrollSpy(ids, offset = 120) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY + offset;
      let current = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= y) current = id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [ids, offset]);
  return active;
}

// ============================================================
// Nav
// ============================================================
const NAV_LINKS = [
  { id: "quatuor",   label: "Le quatuor" },
  { id: "agenda",    label: "Agenda" },
  { id: "repertoire", label: "Répertoire" },
  { id: "ecouter",   label: "Écouter" },
  { id: "galerie",   label: "Galerie" },
];

const Nav = () => {
  const active = useScrollSpy(["hero", ...NAV_LINKS.map(l => l.id), "contact"]);
  return (
    <header className="nav">
      <div className="nav__inner">
        <a href="#hero" className="nav__brand" aria-label="2x2 Voix">
          2<span className="x">×</span>2 Voix
        </a>
        <nav className="nav__links" aria-label="Navigation principale">
          {NAV_LINKS.map(l => (
            <a key={l.id} href={`#${l.id}`} className={`nav__link ${active === l.id ? "is-active" : ""}`}>
              {l.label}
            </a>
          ))}
        </nav>
        <a href="#contact" className="nav__cta">Nous contacter</a>
      </div>
    </header>
  );
};

// ============================================================
// HERO
// ============================================================
const Hero = ({ variant }) => {
  const formula = (
    <div className="hero__formula" aria-hidden="true">
      <span className="digit">2</span>
      <span className="times">×</span>
      <span className="digit digit--accent">2</span>
    </div>
  );

  return (
    <section id="hero" className={`hero hero--${variant}`}>
      <div className="hero__grid">
        {variant !== "portraits" && formula}
        {variant === "portraits" && (
          <div className="hero__portraits">
            {MEMBERS.map((m, i) => (
              <article className="pcard" key={i}>
                <div className="pcard__media">
                  <svg viewBox="0 0 100 130" preserveAspectRatio="xMidYMid slice" style={{ width: "100%", height: "100%", display: "block" }}>
                    <PortraitSVG m={m} idx={i} />
                  </svg>
                  <span className="pcard__voice">{m.voice}</span>
                </div>
                <div className="pcard__body">
                  <div className="pcard__name">
                    <span className="pcard__first">{m.first}</span>
                    <span className="pcard__last">{m.last}</span>
                  </div>
                  <div className="pcard__range">
                    <span className="pcard__range-label">Tessiture</span>
                    <span className="pcard__range-value">{m.range}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
        <div className="hero__copy">
          <div className="hero__eyebrow">Quatuor vocal</div>
          <h1 className="hero__title">
            Quatre voix,<br/>
            <em>deux duos,</em><br/>
            un seul souffle.
          </h1>
          <p className="hero__sub">
            Soprano, alto, ténor, basse&nbsp;: nous chantons la Renaissance,
            le sacré classique et la pop arrangée — comme on traverse une
            même cathédrale, à quatre voix mais d'un même pas.
          </p>
          <div className="hero__ctas">
            <a href="#agenda" className="btn btn--primary">
              Nos prochains concerts <Icon name="arrow-right" size={14} />
            </a>
            <a href="#ecouter" className="btn btn--secondary">
              Écouter un extrait
            </a>
          </div>
        </div>
      </div>

      <div className="voicemarks">
        {MEMBERS.map((m, i) => (
          <div key={i} className="voicemark">
            <div className="voicemark__voice">{m.voice}</div>
            <div className="voicemark__name">{m.first} {m.last}</div>
            <div className="voicemark__range">{m.range}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

// Embedded portrait SVG (for hero portrait variant) — inline so we don't add a 5th file
const PortraitSVG = ({ m, idx }) => {
  const palettes = [
    { bg: "#EDE9E0", fg: "#2C5242", accent: "#C4722A" },
    { bg: "#E4DAC8", fg: "#1C3228", accent: "#B85C1E" },
    { bg: "#E8E2D4", fg: "#2C5242", accent: "#5A8C78" },
    { bg: "#DED4C0", fg: "#1C3228", accent: "#C4722A" },
  ];
  const p = palettes[idx % palettes.length];
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
      <path d={isF ? "M 8 130 Q 8 96 28 86 L 50 80 L 72 86 Q 92 96 92 130 Z" : "M 4 130 Q 4 92 24 84 L 50 78 L 76 84 Q 96 92 96 130 Z"} fill={p.fg} />
      <ellipse cx="50" cy="58" rx={isF ? 17 : 18} ry={isF ? 21 : 22} fill={p.bg} stroke={p.fg} strokeOpacity="0.3" strokeWidth="0.8" />
      {isF
        ? <path d="M 30 52 Q 28 32 50 32 Q 72 32 70 52 Q 72 64 68 70 Q 68 50 50 46 Q 32 50 32 70 Q 28 64 30 52 Z" fill={p.fg} opacity="0.92" />
        : <path d="M 34 46 Q 36 36 50 36 Q 64 36 66 46 Q 66 52 64 52 Q 58 44 50 44 Q 42 44 36 52 Q 34 52 34 46 Z" fill={p.fg} opacity="0.92" />}
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

// ============================================================
// QUATUOR (About + duos)
// ============================================================
const About = () => (
  <section id="quatuor" className="section section--narrow" data-screen-label="Le quatuor">
    <div className="section__label">Qui sommes-nous</div>
    <h2 className="section__title">Quatre frustrations<br/>devenues un quatuor.</h2>

    <div className="about__story">
      <p>
        Le groupe est né d'une frustration partagée&nbsp;: ne pas trouver
        d'alter ego en chant. Chacun de nous portait des envies différentes —
        l'un rêvait de polyphonies de la Renaissance, l'autre de classique sacré,
        un autre encore de pop arrangée à quatre voix.
      </p>
      <p>
        C'est tout naturellement que nous avons mis nos capacités au service
        des envies de chacun. Nous formons aujourd'hui deux duos qui se
        répondent&nbsp;: voix de femmes, voix d'hommes — deux et deux,
        autant que possible à parts égales.
      </p>
      <p>
        Notre répertoire traverse cinq siècles sans coutures&nbsp;: de Dufay
        à Coldplay, en passant par Mozart et Brel. La même attention au
        texte, à l'accord, au silence.
      </p>
    </div>
  </section>
);

// ============================================================
// REPERTOIRE
// ============================================================
const Repertoire = () => {
  const [active, setActive] = useState(REPERTOIRE[0].id);
  return (
    <section id="repertoire" className="rep" data-screen-label="Répertoire">
      <div className="rep__inner">
        <div className="section__label">Répertoire</div>
        <h2 className="section__title">Cinq siècles,<br/>trois familles.</h2>
        <p className="section__lede">
          Notre répertoire se déploie sur trois grandes familles que nous
          aimons faire dialoguer au sein d'un même programme — chacune avec
          sa lumière propre.
        </p>

        <div className="famcards">
          {REPERTOIRE.map((cat) => (
            <article
              key={cat.id}
              className={`famcard famcard--${cat.id} ${active === cat.id ? "is-active" : ""}`}
              onMouseEnter={() => setActive(cat.id)}
              onFocus={() => setActive(cat.id)}
              tabIndex={0}
            >
              <div className="famcard__head">
                <span className="famcard__roman" aria-hidden="true">{cat.roman}</span>
                <span className="famcard__period">{cat.period}</span>
              </div>
              <h3 className="famcard__title">{cat.label}</h3>
              <div className="famcard__teaser">{cat.teaser}</div>
              <p className="famcard__desc" dangerouslySetInnerHTML={{ __html: cat.description }} />
              <div className="famcard__composers">
                {cat.composers.map((c) => (
                  <span key={c} className="famcard__composer">{c}</span>
                ))}
              </div>
              <div className="famcard__signature">
                <span className="famcard__signature-label">Une pièce signature</span>
                <span className="famcard__signature-title">{cat.signature}</span>
                <span className="famcard__signature-by">{cat.signatureComposer}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

// ============================================================
// AGENDA
// ============================================================
const Agenda = () => (
  <section id="agenda" className="section" data-screen-label="Agenda">
    <div className="section__label">Agenda</div>
    <h2 className="section__title">Prochains concerts.</h2>
    <p className="section__lede">
      Nous chantons quelques fois par an, pour des lieux et des occasions
      qui ont du sens. Voici où nous retrouver dans les mois qui viennent.
    </p>
    <div className="agenda">
      {EVENTS.map(e => <EventCard key={e.id} event={e} />)}
    </div>
  </section>
);

// ============================================================
// ÉCOUTER (audio placeholders)
// ============================================================
const Listen = () => {
  const [playingIdx, setPlayingIdx] = useState(null);
  const [progress, setProgress] = useState({});
  const timerRef = useRef(null);

  useEffect(() => {
    if (playingIdx === null) {
      clearInterval(timerRef.current);
      return;
    }
    timerRef.current = setInterval(() => {
      setProgress(p => {
        const cur = p[playingIdx] || 0;
        const dur = TRACKS[playingIdx].duration;
        if (cur >= dur) {
          setPlayingIdx(null);
          return { ...p, [playingIdx]: 0 };
        }
        return { ...p, [playingIdx]: cur + 1 };
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [playingIdx]);

  const toggle = (i) => {
    setPlayingIdx(cur => cur === i ? null : i);
  };

  return (
    <section id="ecouter" className="section" data-screen-label="Écouter">
      <div className="section__label">Écouter</div>
      <h2 className="section__title">Quelques extraits.</h2>
      <p className="section__lede">
        Trois pièces tirées de nos répétitions récentes — captées sur le vif,
        sans retouche. De quoi se faire une idée de notre couleur d'ensemble.
      </p>
      <div className="listen__grid">
        {TRACKS.map((t, i) => (
          <Track
            key={i}
            track={t}
            isPlaying={playingIdx === i}
            onToggle={() => toggle(i)}
            progress={progress[i] || 0}
          />
        ))}
      </div>
    </section>
  );
};

// ============================================================
// GALERIE
// ============================================================
const Gallery = () => (
  <section id="galerie" className="section" data-screen-label="Galerie">
    <div className="section__label">Galerie</div>
    <h2 className="section__title">Quelques images.</h2>
    <p className="section__lede">
      Répétitions, concerts, lieux qui nous ont accueillis. Les photos
      authentiques remplaceront ces placeholders dès la prochaine séance.
    </p>
    <div className="gallery">
      {GALLERY.map((g, i) => <GalleryItem key={i} item={g} idx={i} />)}
    </div>
  </section>
);

// ============================================================
// CONTACT
// ============================================================
const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", subject: "concert", message: "" });
  const [sent, setSent] = useState(false);
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const submit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setForm({ name: "", email: "", subject: "concert", message: "" });
    }, 5000);
  };

  return (
    <section id="contact" className="contact" data-screen-label="Contact">
      <div className="contact__inner">
        <div>
          <div className="contact__label">Nous écrire</div>
          <h2 className="contact__title">Une église,<br/>une occasion,<br/>un projet ?</h2>
          <p className="contact__sub">
            Nous répondons en quelques jours. Pour un concert, une animation
            ou un mariage&nbsp;: dites-nous où, quand, et nous reviendrons vers vous.
          </p>
          <div className="contact__details">
            <div className="contact__detail"><Icon name="mail" size={16} /> contact@2x2voix.fr</div>
            <div className="contact__detail"><Icon name="phone" size={16} /> +33 6 12 34 56 78</div>
            <div className="contact__detail"><Icon name="map-pin" size={16} /> Basés en Bourgogne–Franche-Comté</div>
            <div className="contact__detail"><Icon name="instagram" size={16} /> @2x2voix</div>
          </div>
        </div>

        <form className="form" onSubmit={submit}>
          {sent ? (
            <div className="form__success">
              <Icon name="check" size={18} />
              <div>
                <strong>Merci, {form.name.split(" ")[0] || "et à très vite"}.</strong><br/>
                Votre message est arrivé. Nous vous répondons sous quelques jours.
              </div>
            </div>
          ) : (
            <>
              <div className="form__row">
                <div className="field">
                  <label className="field__label" htmlFor="f-name">Votre nom</label>
                  <input id="f-name" className="field__input" type="text" value={form.name}
                         onChange={e => set("name", e.target.value)} placeholder="Prénom Nom" required />
                </div>
                <div className="field">
                  <label className="field__label" htmlFor="f-email">Email</label>
                  <input id="f-email" className="field__input" type="email" value={form.email}
                         onChange={e => set("email", e.target.value)} placeholder="vous@example.fr" required />
                </div>
              </div>
              <div className="field">
                <label className="field__label" htmlFor="f-subject">Objet</label>
                <select id="f-subject" className="field__select" value={form.subject}
                        onChange={e => set("subject", e.target.value)}>
                  <option value="concert">Réservation d'un concert</option>
                  <option value="mariage">Mariage / cérémonie</option>
                  <option value="animation">Animation d'événement</option>
                  <option value="presse">Demande presse</option>
                  <option value="autre">Autre</option>
                </select>
              </div>
              <div className="field">
                <label className="field__label" htmlFor="f-msg">Votre message</label>
                <textarea id="f-msg" className="field__textarea" value={form.message}
                          onChange={e => set("message", e.target.value)}
                          placeholder="Date, lieu, contexte, nombre de personnes attendues…" required></textarea>
              </div>
              <button type="submit" className="form__submit">
                Envoyer le message <Icon name="arrow-right" size={14} />
              </button>
            </>
          )}
        </form>
      </div>
    </section>
  );
};

// ============================================================
// FOOTER
// ============================================================
const Footer = () => (
  <footer className="footer">
    <div className="footer__brand">2<span style={{color: "var(--color-accent)", fontStyle: "italic"}}>×</span>2 Voix</div>
    <div>Quatuor vocal · contact@2x2voix.fr · © {new Date().getFullYear()}</div>
  </footer>
);

// ============================================================
// APP
// ============================================================
const App = () => {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  // Apply theme & typography to <html>
  useEffect(() => {
    document.documentElement.dataset.theme = t.theme === "default" ? "" : t.theme;
    document.documentElement.dataset.typo  = t.typo === "classic" ? "" : t.typo;
  }, [t.theme, t.typo]);

  return (
    <div className="site">
      <Nav />
      <main>
        <Hero variant={t.heroVariant} />
        <About />
        <Agenda />
        <Repertoire />
        <Listen />
        <Gallery />
        <Contact />
      </main>
      <Footer />

      <TweaksPanel title="Tweaks">
        <TweakSection title="Hero">
          <TweakRadio
            label="Variante"
            value={t.heroVariant}
            onChange={v => setTweak("heroVariant", v)}
            options={[
              { value: "formula",    label: "Formule" },
              { value: "portraits",  label: "Portraits" },
              { value: "manuscript", label: "Centré" },
            ]}
          />
        </TweakSection>
        <TweakSection title="Palette">
          <TweakRadio
            label="Ambiance"
            value={t.theme}
            onChange={v => setTweak("theme", v)}
            options={[
              { value: "default", label: "Forêt" },
              { value: "warm",    label: "Chaleur" },
              { value: "mono",    label: "Sobre" },
            ]}
          />
        </TweakSection>
        <TweakSection title="Typographie">
          <TweakSelect
            label="Famille de titres"
            value={t.typo}
            onChange={v => setTweak("typo", v)}
            options={[
              { value: "classic", label: "Classique (New York / Source Serif)" },
              { value: "hybrid",  label: "Hybride (EB Garamond italique + Cinzel + Space Grotesk)" },
              { value: "modern",  label: "Moderne (Cormorant Garamond)" },
              { value: "display", label: "Display (Playfair)" },
            ]}
          />
        </TweakSection>
      </TweaksPanel>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
