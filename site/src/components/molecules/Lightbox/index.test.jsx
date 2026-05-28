import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import Lightbox from '.';

const defaultProps = {
  src: 'photo.jpg',
  label: 'Église de Thise',
  index: 0,
  total: 3,
  onClose: vi.fn(),
  onPrev: null,
  onNext: vi.fn(),
};

describe('Lightbox', () => {
  it('affiche l\'image avec son label', () => {
    render(<Lightbox {...defaultProps} />);
    expect(screen.getByRole('img', { name: 'Église de Thise' })).toBeInTheDocument();
  });

  it('affiche le compteur quand total > 1', () => {
    render(<Lightbox {...defaultProps} />);
    expect(screen.getByText(/1 \/ 3/)).toBeInTheDocument();
  });

  it('n\'affiche pas le compteur quand total vaut 1', () => {
    render(<Lightbox {...defaultProps} total={1} />);
    expect(screen.queryByText(/1 \/ 1/)).not.toBeInTheDocument();
  });

  it('appelle onClose au clic sur le bouton Fermer', () => {
    const onClose = vi.fn();
    render(<Lightbox {...defaultProps} onClose={onClose} />);
    fireEvent.click(screen.getByRole('button', { name: /Fermer/i }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('appelle onClose avec la touche Escape', () => {
    const onClose = vi.fn();
    render(<Lightbox {...defaultProps} onClose={onClose} />);
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('affiche le bouton suivant quand onNext est fourni', () => {
    render(<Lightbox {...defaultProps} onNext={vi.fn()} />);
    expect(screen.getByRole('button', { name: /Photo suivante/i })).toBeInTheDocument();
  });

  it('n\'affiche pas le bouton précédent quand onPrev est null', () => {
    render(<Lightbox {...defaultProps} onPrev={null} />);
    expect(screen.queryByRole('button', { name: /Photo précédente/i })).not.toBeInTheDocument();
  });

  it('appelle onNext avec la touche ArrowRight', () => {
    const onNext = vi.fn();
    render(<Lightbox {...defaultProps} onNext={onNext} />);
    fireEvent.keyDown(document, { key: 'ArrowRight' });
    expect(onNext).toHaveBeenCalledTimes(1);
  });

  it('a le rôle dialog avec aria-modal', () => {
    render(<Lightbox {...defaultProps} />);
    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveAttribute('aria-modal', 'true');
  });
});
