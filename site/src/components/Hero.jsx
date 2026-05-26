import Icon from './Icon.jsx';

const Hero = () => (
  <section id="hero" className="hero">
    <div className="hero__grid">
      <h1 className="hero__formula">
        <span className="hero__formula-row">
          <span className="digit">2</span>
          <span className="times">×</span>
          <span className="digit digit--accent">2</span>
        </span>
        <span className="hero__formula-voix">Voix</span>
      </h1>
      <div className="hero__copy">
        <div className="hero__eyebrow">Quatuor vocal à Besançon</div>
        <p className="hero__sub">
          Renaissance, classique et harmonies contemporaines.<br />
          Concerts et événements en Franche-Comté.
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
