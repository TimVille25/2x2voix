import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import Agenda from '.';

beforeEach(() => {
  global.URL.createObjectURL = vi.fn(() => 'blob:mock');
  global.URL.revokeObjectURL = vi.fn();
});

describe('Agenda', () => {
  it('affiche le titre de la section', () => {
    render(<Agenda />);
    expect(screen.getByText('Concerts')).toBeInTheDocument();
  });

  it('affiche le sous-titre', () => {
    render(<Agenda />);
    expect(screen.getByText('Prochains concerts.')).toBeInTheDocument();
  });

  it('affiche les événements de data.js', () => {
    render(<Agenda />);
    expect(screen.getAllByRole('button', { name: /Ajouter à mon agenda/i }).length).toBeGreaterThan(0);
  });

  it('a la section avec l\'id concerts', () => {
    const { container } = render(<Agenda />);
    expect(container.querySelector('#concerts')).toBeInTheDocument();
  });
});
