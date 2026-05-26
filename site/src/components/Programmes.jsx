import { useState } from 'react';
import { REPERTOIRE } from '../data.js';
import archSvgRaw from '../assets/arche.svg?raw';

/* ── Décorations ──────────────────────────────────────────── */

function PianoKeys() {
  // 7 touches blanches (C D E F G A B), 5 noires (C# D# F# G# A#)
  const WX = [0, 9, 18, 27, 36, 45, 54]; // x des touches blanches
  const BX = [5.5, 14.5, 32.5, 41.5, 50.5]; // x des touches noires (centrées)
  return (
    <svg viewBox="0 0 62 98" aria-hidden="true" className="prog-deco__svg">
      {WX.map((x, i) => (
        <rect key={`w${i}`} x={x + 0.75} y={0.75} width={7.5} height={96.5}
          rx={1.5} fill="none" stroke="currentColor" strokeWidth="1.5" />
      ))}
      {BX.map((x, i) => (
        <rect key={`b${i}`} x={x + 0.75} y={0.75} width={4.5} height={58}
          rx={1} fill="currentColor" />
      ))}
    </svg>
  );
}

function VinylRecord() {
  return (
    <svg viewBox="0 0 100 100" aria-hidden="true" className="prog-deco__svg">
      <circle cx="50" cy="50" r="47" fill="none" stroke="currentColor" strokeWidth="1.5" />
      {[40, 33, 26].map((r) => (
        <circle key={r} cx="50" cy="50" r={r} fill="none"
          stroke="currentColor" strokeWidth="0.8" opacity="0.55" />
      ))}
      <circle cx="50" cy="50" r="19" fill="none" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="50" cy="50" r="3.5" fill="currentColor" />
    </svg>
  );
}

/* ── Composant principal ──────────────────────────────────── */

const Programmes = () => {
  const [active, setActive] = useState(REPERTOIRE[0].id);
  return (
    <section id="programmes" className="rep">
      <div className="rep__inner">
        <div className="section__label">Programmes</div>
        <h2 className="section__title">Cinq siècles,<br />trois familles.</h2>
        <p className="section__lede">
          Nos concerts prennent des formes différentes selon les lieux et
          les occasions : polyphonies Renaissance, musique classique ou
          harmonies contemporaines.
        </p>

        <div className="famcards">
          {REPERTOIRE.map((cat) => {
            const isRight = cat.id === 'classique';

            const deco = cat.id === 'renaissance' ? (
              <div
                className="prog-deco prog-deco--arch"
                dangerouslySetInnerHTML={{ __html: archSvgRaw }}
              />
            ) : cat.id === 'classique' ? (
              <div className="prog-deco prog-deco--piano">
                <PianoKeys />
              </div>
            ) : (
              <div className="prog-deco prog-deco--vinyl">
                <VinylRecord />
              </div>
            );

            return (
              <div key={cat.id} className={`famcard-row famcard-row--${cat.id}`}>
                {!isRight && deco}
                <article
                  className={`famcard famcard--${cat.id} ${active === cat.id ? 'is-active' : ''}`}
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
                {isRight && deco}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Programmes;
