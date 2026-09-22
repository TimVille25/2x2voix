import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Nav from '.';

vi.mock('../../../assets/2x2voix-logo-black-transparent-bg-no-text.png', () => ({
  default: 'logo.png',
}));

const renderNav = (initialEntries = ['/']) =>
  render(<Nav />, { wrapper: ({ children }) => <MemoryRouter initialEntries={initialEntries}>{children}</MemoryRouter> });

describe('Nav', () => {
  it('affiche tous les liens de navigation', () => {
    renderNav();
    expect(screen.getAllByText('Le quatuor').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Concerts').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Programmes').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Écouter').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Galerie').length).toBeGreaterThan(0);
  });

  it('affiche le logo', () => {
    renderNav();
    expect(screen.getAllByAltText('2x2 Voix').length).toBeGreaterThan(0);
  });

  it('ouvre le menu mobile au clic sur le hamburger', () => {
    renderNav();
    const hamburger = screen.getByRole('button', { name: /Ouvrir le menu/i });
    fireEvent.click(hamburger);
    expect(screen.getByRole('button', { name: /Fermer le menu/i })).toBeInTheDocument();
  });

  it('ferme le menu mobile au clic sur le hamburger quand il est ouvert', () => {
    renderNav();
    fireEvent.click(screen.getByRole('button', { name: /Ouvrir le menu/i }));
    fireEvent.click(screen.getByRole('button', { name: /Fermer le menu/i }));
    expect(screen.getByRole('button', { name: /Ouvrir le menu/i })).toBeInTheDocument();
  });

  it('ferme le menu mobile avec la touche Escape', () => {
    renderNav();
    fireEvent.click(screen.getByRole('button', { name: /Ouvrir le menu/i }));
    fireEvent.keyDown(window, { key: 'Escape' });
    expect(screen.getByRole('button', { name: /Ouvrir le menu/i })).toBeInTheDocument();
  });

  it('a les liens vers Instagram et YouTube', () => {
    renderNav();
    const instagramLinks = screen.getAllByRole('link', { name: /Instagram/i });
    expect(instagramLinks.length).toBeGreaterThan(0);
    const youtubeLinks = screen.getAllByRole('link', { name: /YouTube/i });
    expect(youtubeLinks.length).toBeGreaterThan(0);
  });

  it('pointe vers les ancres de la page d\'accueil quand on y est déjà', () => {
    renderNav(['/']);
    expect(screen.getAllByText('Concerts')[0]).toHaveAttribute('href', '#concerts');
    expect(screen.getAllByAltText('2x2 Voix')[0].closest('a')).toHaveAttribute('href', '#hero');
  });

  it('renvoie vers l\'accueil avec l\'ancre depuis une autre page', () => {
    renderNav(['/concerts/test-2026-07-04']);
    expect(screen.getAllByText('Concerts')[0]).toHaveAttribute('href', '/#concerts');
    expect(screen.getAllByAltText('2x2 Voix')[0].closest('a')).toHaveAttribute('href', '/');
  });
});
