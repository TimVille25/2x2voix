import { useState, useEffect } from 'react';
import Icon from './Icon';

const NAV_LINKS = [
  { id: "quatuor",    label: "Le quatuor" },
  { id: "agenda",     label: "Agenda" },
  { id: "repertoire", label: "Répertoire" },
  { id: "ecouter",    label: "Écouter" },
  { id: "galerie",    label: "Galerie" },
];

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
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [ids, offset]);
  return active;
}

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
            <a key={l.id} href={`#${l.id}`} className={`nav__link ${active === l.id ? 'is-active' : ''}`}>
              {l.label}
            </a>
          ))}
        </nav>
        <div className="nav__social">
          <a href="#" className="nav__social-link" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
            <Icon name="instagram" size={18} stroke={1.5} />
          </a>
          <a href="https://www.youtube.com/@2x2voix" className="nav__social-link" aria-label="YouTube" target="_blank" rel="noopener noreferrer">
            <Icon name="youtube" size={18} stroke={1.5} />
          </a>
        </div>
        <a href="#contact" className="nav__cta">Nous contacter</a>
      </div>
    </header>
  );
};

export default Nav;
