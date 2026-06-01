import Icon from '../../atoms/Icon';
import './style.css';

const Footer = () => (
  <footer className="footer">
    <div className="footer__brand">
      2<span className="footer__brand-times">×</span>2 Voix
    </div>
    <div className="footer__social">
      <a
        href="https://www.instagram.com/2x2voix"
        className="footer__social-link"
        aria-label="Instagram"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Icon name="instagram" size={16} stroke={1.5} />
      </a>
      <a
        href="https://www.youtube.com/@2x2voix"
        className="footer__social-link"
        aria-label="YouTube"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Icon name="youtube" size={16} stroke={1.5} />
      </a>
    </div>
    <div>Quatuor vocal · 2x2voix@gmail.com · © 2026</div>
    <p className="footer__description">
      2x2 Voix est un quatuor vocal basé à Besançon, en Bourgogne-Franche-Comté. Nous proposons des concerts et animations musicales autour du chant polyphonique, de la musique Renaissance, du répertoire classique et de créations plus contemporaines. Notre ensemble intervient lors de concerts, festivals, événements culturels, cérémonies, mariages et manifestations patrimoniales dans le Doubs, le Jura, la Haute-Saône et l'ensemble de la région. Nous défendons une pratique du chant a cappella et de la musique vocale de chambre, accessible à tous les publics.
    </p>
  </footer>
);

export default Footer;
