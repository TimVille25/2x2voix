import { render, screen } from '@testing-library/react';
import Hero from '.';

vi.mock('../../../assets/2x2voix-logo-black-transparent-bg-no-text.png', () => ({
  default: 'logo.png',
}));

describe('Hero', () => {
  it('affiche le titre principal', () => {
    render(<Hero />);
    expect(screen.getByRole('heading', { level: 1, name: /2x2 voix/i })).toBeInTheDocument();
  });

  it('affiche le sous-titre de localisation', () => {
    render(<Hero />);
    expect(screen.getByText(/Quatuor vocal à Besançon/i)).toBeInTheDocument();
  });

  it('affiche les CTAs vers les concerts et l\'écoute', () => {
    render(<Hero />);
    expect(screen.getByRole('link', { name: /Nos concerts/i })).toHaveAttribute('href', '#concerts');
    expect(screen.getByRole('link', { name: /Écouter un extrait/i })).toHaveAttribute('href', '#ecouter');
  });

  it('a la section avec l\'id hero', () => {
    const { container } = render(<Hero />);
    expect(container.querySelector('#hero')).toBeInTheDocument();
  });
});
