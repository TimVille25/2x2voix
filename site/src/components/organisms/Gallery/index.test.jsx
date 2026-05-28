import { render, screen, fireEvent } from '@testing-library/react';
import Gallery from '.';

vi.mock('../../../assets/Jardin.jpg', () => ({ default: 'Jardin.jpg' }));
vi.mock('../../../assets/Visuel-eglise-sans-texte.jpg', () => ({ default: 'eglise.jpg' }));

describe('Gallery', () => {
  it('affiche le titre de la section', () => {
    render(<Gallery />);
    expect(screen.getByText('Galerie')).toBeInTheDocument();
  });

  it('affiche les images de la galerie', () => {
    render(<Gallery />);
    expect(screen.getByAltText('Église de Thise')).toBeInTheDocument();
    expect(screen.getByAltText('Répétition dans le jardin')).toBeInTheDocument();
  });

  it('ouvre la lightbox au clic sur une photo', () => {
    render(<Gallery />);
    fireEvent.click(screen.getByAltText('Église de Thise').closest('.gallery__item'));
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('ferme la lightbox au clic sur le bouton Fermer', () => {
    render(<Gallery />);
    fireEvent.click(screen.getByAltText('Église de Thise').closest('.gallery__item'));
    fireEvent.click(screen.getByRole('button', { name: /Fermer/i }));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('a la section avec l\'id galerie', () => {
    const { container } = render(<Gallery />);
    expect(container.querySelector('#galerie')).toBeInTheDocument();
  });
});
