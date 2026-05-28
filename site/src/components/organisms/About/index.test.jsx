import { render, screen } from '@testing-library/react';
import About from '.';

describe('About', () => {
  it('affiche le titre de la section', () => {
    render(<About />);
    expect(screen.getByText('Qui sommes-nous')).toBeInTheDocument();
  });

  it('affiche le sous-titre', () => {
    render(<About />);
    expect(screen.getByText(/Un quatuor vocal de Franche-Comté/i)).toBeInTheDocument();
  });

  it('affiche le texte de présentation', () => {
    render(<About />);
    expect(screen.getByText(/2×2 Voix est un quatuor vocal basé à Besançon/i)).toBeInTheDocument();
  });

  it('a la section avec l\'id quatuor', () => {
    const { container } = render(<About />);
    expect(container.querySelector('#quatuor')).toBeInTheDocument();
  });
});
