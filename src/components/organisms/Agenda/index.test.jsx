import { render, screen } from '@testing-library/react';
import { vi, afterEach } from 'vitest';
import Agenda from '.';

beforeEach(() => {
  global.URL.createObjectURL = vi.fn(() => 'blob:mock');
  global.URL.revokeObjectURL = vi.fn();
  vi.setSystemTime(new Date('2026-07-19T12:00:00'));
});

afterEach(() => {
  vi.useRealTimers();
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

  it('archive les concerts passés dans une section repliée par défaut', () => {
    const { container } = render(<Agenda />);
    const archive = container.querySelector('.agenda-archive');
    expect(archive).toBeInTheDocument();
    expect(archive).not.toHaveAttribute('open');
  });

  it('garde les concerts passés dans le DOM pour le SEO', () => {
    render(<Agenda />);
    expect(screen.getByText('Passé')).toBeInTheDocument();
  });
});
