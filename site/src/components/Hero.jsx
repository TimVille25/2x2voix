import Icon from './Icon.jsx';

const Hero = () => (
  <section id="hero" className="hero">
    <div className="hero__grid">
      <div className="hero__formula" aria-hidden="true">
        <span className="digit">2</span>
        <span className="times">×</span>
        <span className="digit digit--accent">2</span>
      </div>
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
  </section>
);

export default Hero;
