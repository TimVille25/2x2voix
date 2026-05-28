import { render, screen, fireEvent } from '@testing-library/react';
import Programmes from '.';

vi.mock('../../../assets/arche.svg?raw', () => ({ default: '<svg></svg>' }));

describe('Programmes', () => {
  it('affiche le titre de la section', () => {
    render(<Programmes />);
    expect(screen.getByText('Programmes')).toBeInTheDocument();
  });

  it('affiche les catégories de répertoire', () => {
    render(<Programmes />);
    expect(screen.getByText('Renaissance')).toBeInTheDocument();
    expect(screen.getByText('Classique & contemporain')).toBeInTheDocument();
  });

  it('affiche les compositeurs de chaque programme', () => {
    render(<Programmes />);
    expect(screen.getAllByText('Josquin des Prez').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Gabriel Fauré').length).toBeGreaterThan(0);
  });

  it('active une carte au survol', () => {
    render(<Programmes />);
    const classCard = screen.getByText('Classique & contemporain').closest('article');
    fireEvent.mouseEnter(classCard);
    expect(classCard).toHaveClass('is-active');
  });

  it('a la section avec l\'id programmes', () => {
    const { container } = render(<Programmes />);
    expect(container.querySelector('#programmes')).toBeInTheDocument();
  });
});
