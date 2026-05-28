import { render, screen } from '@testing-library/react';
import Footer from '.';

describe('Footer', () => {
  it('affiche le nom du groupe', () => {
    render(<Footer />);
    expect(screen.getByText(/2.*2 Voix/)).toBeInTheDocument();
  });

  it('affiche l\'email de contact', () => {
    render(<Footer />);
    expect(screen.getByText(/2x2voix@gmail.com/)).toBeInTheDocument();
  });

  it('a un lien Instagram', () => {
    render(<Footer />);
    expect(screen.getByRole('link', { name: /Instagram/i })).toHaveAttribute(
      'href',
      'https://www.instagram.com/2x2voix'
    );
  });

  it('a un lien YouTube', () => {
    render(<Footer />);
    expect(screen.getByRole('link', { name: /YouTube/i })).toHaveAttribute(
      'href',
      'https://www.youtube.com/@2x2voix'
    );
  });

  it('les liens externes s\'ouvrent dans un nouvel onglet', () => {
    render(<Footer />);
    const links = screen.getAllByRole('link');
    links.forEach((link) => {
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    });
  });
});
