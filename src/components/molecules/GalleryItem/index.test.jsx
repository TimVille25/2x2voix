import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import GalleryItem from '.';

const mockItem = { label: 'Église de Thise', layout: 'wide', file: 'eglise.jpg' };

describe('GalleryItem', () => {
  it('affiche le label de l\'image', () => {
    render(<GalleryItem item={mockItem} idx={0} src="eglise.jpg" onOpen={vi.fn()} />);
    expect(screen.getByText('Église de Thise')).toBeInTheDocument();
  });

  it('affiche une image quand src est fourni', () => {
    render(<GalleryItem item={mockItem} idx={0} src="eglise.jpg" onOpen={vi.fn()} />);
    expect(screen.getByRole('img', { name: 'Église de Thise' })).toBeInTheDocument();
  });

  it('affiche un placeholder quand src est null', () => {
    const placeholderItem = { label: 'Photo 01', layout: 'normal', file: null };
    render(<GalleryItem item={placeholderItem} idx={0} src={null} />);
    expect(screen.getByText(/photo · 01/i)).toBeInTheDocument();
  });

  it('appelle onOpen au clic sur une photo', () => {
    const onOpen = vi.fn();
    render(<GalleryItem item={mockItem} idx={0} src="eglise.jpg" onOpen={onOpen} />);
    fireEvent.click(screen.getByText('Église de Thise').closest('.gallery__item'));
    expect(onOpen).toHaveBeenCalledTimes(1);
  });

  it('n\'appelle pas onOpen si src est null', () => {
    const onOpen = vi.fn();
    const placeholderItem = { label: 'Photo 01', layout: 'normal', file: null };
    render(<GalleryItem item={placeholderItem} idx={0} src={null} onOpen={onOpen} />);
    fireEvent.click(screen.getByText(/photo · 01/i).closest('.gallery__item'));
    expect(onOpen).not.toHaveBeenCalled();
  });

  it('applique la classe wide pour un item en layout wide', () => {
    const { container } = render(<GalleryItem item={mockItem} idx={0} src="eglise.jpg" onOpen={vi.fn()} />);
    expect(container.firstChild).toHaveClass('gallery__item--wide');
  });
});
