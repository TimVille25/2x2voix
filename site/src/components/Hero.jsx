import logo from '../assets/2x2voix-logo-black-transparent-bg-no-text.png';
import Icon from './Icon.jsx';

const Hero = () => (
  <section id="hero" className="hero">
    <div className="hero__grid">
      <div className="hero__identity">
        <img src={logo} alt="" className="hero__logo" />
        <h1 className="hero__title-main">2x2 voix</h1>
      </div>
      <div className="hero__copy">
        <p className="hero__sub">
          <strong className="hero__sub-location">Quatuor vocal à Besançon</strong>
          <br />
          Polyphonies renaissance, classique et harmonies contemporaines.
          <br />
          Entre héritage vocal et résonances d'aujourd'hui.
        </p>
        <div className="hero__ctas">
          <a href="#concerts" className="btn btn--primary">
            Nos concerts <Icon name="arrow-right" size={14} />
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
