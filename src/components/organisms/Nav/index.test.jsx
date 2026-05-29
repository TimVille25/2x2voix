import { render, screen, fireEvent } from '@testing-library/react';
import Nav from '.';

vi.mock('../../../assets/2x2voix-logo-black-transparent-bg-no-text.png', () => ({
  default: 'logo.png',
}));

describe('Nav', () => {
  it('affiche tous les liens de navigation', () => {
    render(<Nav />);
    expect(screen.getAllByText('Le quatuor').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Concerts').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Programmes').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Écouter').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Galerie').length).toBeGreaterThan(0);
  });

  it('affiche le logo', () => {
    render(<Nav />);
    expect(screen.getAllByAltText('2x2 Voix').length).toBeGreaterThan(0);
  });

  it('ouvre le menu mobile au clic sur le hamburger', () => {
    render(<Nav />);
    const hamburger = screen.getByRole('button', { name: /Ouvrir le menu/i });
    fireEvent.click(hamburger);
    expect(screen.getByRole('button', { name: /Fermer le menu/i })).toBeInTheDocument();
  });

  it('ferme le menu mobile au clic sur le hamburger quand il est ouvert', () => {
    render(<Nav />);
    fireEvent.click(screen.getByRole('button', { name: /Ouvrir le menu/i }));
    fireEvent.click(screen.getByRole('button', { name: /Fermer le menu/i }));
    expect(screen.getByRole('button', { name: /Ouvrir le menu/i })).toBeInTheDocument();
  });

  it('ferme le menu mobile avec la touche Escape', () => {
    render(<Nav />);
    fireEvent.click(screen.getByRole('button', { name: /Ouvrir le menu/i }));
    fireEvent.keyDown(window, { key: 'Escape' });
    expect(screen.getByRole('button', { name: /Ouvrir le menu/i })).toBeInTheDocument();
  });

  it('a les liens vers Instagram et YouTube', () => {
    render(<Nav />);
    const instagramLinks = screen.getAllByRole('link', { name: /Instagram/i });
    expect(instagramLinks.length).toBeGreaterThan(0);
    const youtubeLinks = screen.getAllByRole('link', { name: /YouTube/i });
    expect(youtubeLinks.length).toBeGreaterThan(0);
  });
});
