import { useState, useEffect } from 'react';
import logo from '../assets/2x2voix-logo-black-transparent-bg-no-text.png';
import Icon from './Icon';

const NAV_LINKS = [
  { id: "quatuor",    label: "Le quatuor" },
  { id: "concerts",   label: "Concerts" },
  { id: "programmes",  label: "Programmes" },
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
  const [menuOpen, setMenuOpen] = useState(false);

  // Fermer avec Escape
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setMenuOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // Bloquer le scroll body quand le menu est ouvert
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <header className="nav">
        <div className="nav__inner">
          <a href="#hero" className="nav__brand" aria-label="2x2 Voix" onClick={closeMenu}>
            <img src={logo} alt="2x2 Voix" className="nav__brand-logo" />
          </a>

          {/* Liens desktop */}
          <nav className="nav__links" aria-label="Navigation principale">
            {NAV_LINKS.map(l => (
              <a key={l.id} href={`#${l.id}`} className={`nav__link ${active === l.id ? 'is-active' : ''}`}>
                {l.label}
              </a>
            ))}
          </nav>

          {/* Réseaux sociaux desktop */}
          <div className="nav__social nav__social--desktop">
            <a href="#" className="nav__social-link" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
              <Icon name="instagram" size={18} stroke={1.5} />
            </a>
            <a href="https://www.youtube.com/@2x2voix" className="nav__social-link" aria-label="YouTube" target="_blank" rel="noopener noreferrer">
              <Icon name="youtube" size={18} stroke={1.5} />
            </a>
          </div>

          {/* CTA desktop */}
          <a href="#contact" className="nav__cta nav__cta--desktop">Nous contacter</a>

          {/* Bouton hamburger mobile */}
          <button
            className={`nav__hamburger${menuOpen ? ' is-open' : ''}`}
            aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            aria-expanded={menuOpen}
            aria-controls="nav-mobile"
            onClick={() => setMenuOpen(o => !o)}
          >
            <span className="nav__hamburger-bar" />
            <span className="nav__hamburger-bar" />
            <span className="nav__hamburger-bar" />
          </button>
        </div>
      </header>

      {/* Menu mobile */}
      <div
        id="nav-mobile"
        className={`nav__mobile${menuOpen ? ' is-open' : ''}`}
        aria-hidden={!menuOpen}
      >
        <div className="nav__mobile-inner">
          <nav className="nav__mobile-links" aria-label="Navigation mobile">
            {NAV_LINKS.map((l, i) => (
              <a
                key={l.id}
                href={`#${l.id}`}
                className={`nav__mobile-link${active === l.id ? ' is-active' : ''}`}
                style={{ transitionDelay: menuOpen ? `${i * 40}ms` : '0ms' }}
                onClick={closeMenu}
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="nav__mobile-footer">
            <div className="nav__mobile-social">
              <a href="#" className="nav__social-link nav__mobile-social-link" aria-label="Instagram" target="_blank" rel="noopener noreferrer" onClick={closeMenu}>
                <Icon name="instagram" size={20} stroke={1.5} />
              </a>
              <a href="https://www.youtube.com/@2x2voix" className="nav__social-link nav__mobile-social-link" aria-label="YouTube" target="_blank" rel="noopener noreferrer" onClick={closeMenu}>
                <Icon name="youtube" size={20} stroke={1.5} />
              </a>
            </div>
            <a href="#contact" className="nav__mobile-cta" onClick={closeMenu}>
              Nous contacter
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Nav;
