const Footer = () => (
  <footer className="footer">
    <div className="footer__brand">
      2<span style={{ color: 'var(--color-accent)', fontStyle: 'italic' }}>×</span>2 Voix
    </div>
    <div>Quatuor vocal · contact@2x2voix.fr · © {new Date().getFullYear()}</div>
  </footer>
);

export default Footer;
