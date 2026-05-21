import { MEMBERS } from '../data.js';
import { PortraitInline } from './Portrait.jsx';
import Icon from './Icon.jsx';

const Hero = ({ variant = 'portraits' }) => {
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
        {variant !== 'portraits' && formula}
        {variant === 'portraits' && (
          <div className="hero__portraits">
            {MEMBERS.map((m, i) => (
              <article className="pcard" key={i}>
                <div className="pcard__media">
                  <svg viewBox="0 0 100 130" preserveAspectRatio="xMidYMid slice" style={{ width: '100%', height: '100%', display: 'block' }}>
                    <PortraitInline m={m} idx={i} />
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
            Quatre voix,<br />
            <em>deux duos,</em><br />
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

export default Hero;
