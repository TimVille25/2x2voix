import { render, screen, fireEvent, within } from '@testing-library/react';
import Gallery from '.';

vi.mock('../../../assets/Jardin.webp', () => ({ default: 'jardin-thumb.webp' }));
vi.mock('../../../assets/Visuel-eglise-sans-texte.webp', () => ({ default: 'eglise-thumb.webp' }));
vi.mock('../../../assets/Jardin.jpg', () => ({ default: 'jardin-full.jpg' }));
vi.mock('../../../assets/Visuel-eglise-sans-texte.jpg', () => ({ default: 'eglise-full.jpg' }));

describe('Gallery', () => {
  it('affiche le titre de la section', () => {
    render(<Gallery />);
    expect(screen.getByText('Galerie')).toBeInTheDocument();
  });

  it('affiche les vignettes WebP dans la grille', () => {
    render(<Gallery />);
    expect(screen.getByAltText('Église de Thise')).toHaveAttribute('src', 'eglise-thumb.webp');
    expect(screen.getByAltText('Répétition dans le jardin')).toHaveAttribute('src', 'jardin-thumb.webp');
  });

  it('ouvre la lightbox au clic sur une photo', () => {
    render(<Gallery />);
    fireEvent.click(screen.getByAltText('Église de Thise').closest('.gallery__item'));
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('utilise le JPEG original dans la lightbox', () => {
    render(<Gallery />);
    fireEvent.click(screen.getByAltText('Église de Thise').closest('.gallery__item'));
    const lightboxImg = within(screen.getByRole('dialog')).getByAltText('Église de Thise');
    expect(lightboxImg).toHaveAttribute('src', 'eglise-full.jpg');
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
