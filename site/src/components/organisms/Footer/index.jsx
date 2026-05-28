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
  </footer>
);

export default Footer;
