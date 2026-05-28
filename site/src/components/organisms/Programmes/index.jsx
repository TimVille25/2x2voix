import { useState } from 'react';
import { REPERTOIRE } from '../../../data.js';
import archSvgRaw from '../../../assets/arche.svg?raw';
import './style.css';

const PianoKeys = () => {
  const WHITE_KEY_X = [0, 9, 18, 27, 36, 45, 54];
  const BLACK_KEY_X = [5.5, 14.5, 32.5, 41.5, 50.5];

  return (
    <svg viewBox="0 0 62 98" aria-hidden="true" className="prog-deco__svg">
      {WHITE_KEY_X.map((x, i) => (
        <rect key={`w${i}`} x={x + 0.75} y={0.75} width={7.5} height={96.5}
          rx={1.5} fill="none" stroke="currentColor" strokeWidth="1.5" />
      ))}
      {BLACK_KEY_X.map((x, i) => (
        <rect key={`b${i}`} x={x + 0.75} y={0.75} width={4.5} height={58}
          rx={1} fill="currentColor" />
      ))}
    </svg>
  );
};

const VinylRecord = () => (
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

const CATEGORY_DECO = {
  renaissance: (
    <div
      className="prog-deco prog-deco--arch"
      dangerouslySetInnerHTML={{ __html: archSvgRaw }}
    />
  ),
  classique: (
    <div className="prog-deco prog-deco--piano">
      <PianoKeys />
    </div>
  ),
  pop: (
    <div className="prog-deco prog-deco--vinyl">
      <VinylRecord />
    </div>
  ),
};

const Programmes = () => {
  const [active, setActive] = useState(REPERTOIRE[0].id);

  return (
    <section id="programmes" className="rep bg-alt">
      <div className="rep__inner">
        <h2 className="section__label">Programmes</h2>
        <div className="section__title">Cinq siècles,<br />deux familles.</div>
        <p className="section__lede">
          Nos concerts prennent des formes différentes selon les lieux et
          les occasions : polyphonies renaissance ou musique classique sacrée et profane.
        </p>

        <div className="famcards">
          {REPERTOIRE.map((cat) => {
            const isRight = cat.id === 'classique';
            const deco = CATEGORY_DECO[cat.id] ?? null;

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
                    {cat.wip && (
                      <span className="famcard__wip" aria-label="En construction">
                        En construction
                      </span>
                    )}
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
