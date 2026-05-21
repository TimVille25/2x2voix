import { useState } from 'react';
import { REPERTOIRE } from '../data.js';

const Repertoire = () => {
  const [active, setActive] = useState(REPERTOIRE[0].id);
  return (
    <section id="repertoire" className="rep">
      <div className="rep__inner">
        <div className="section__label">Répertoire</div>
        <h2 className="section__title">Cinq siècles,<br />trois familles.</h2>
        <p className="section__lede">
          Notre répertoire se déploie sur trois grandes familles que nous
          aimons faire dialoguer au sein d'un même programme — chacune avec
          sa lumière propre.
        </p>

        <div className="famcards">
          {REPERTOIRE.map((cat) => (
            <article
              key={cat.id}
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
          ))}
        </div>
      </div>
    </section>
  );
};

export default Repertoire;
