import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import EventCard from '.';

const mockEvent = {
  id: 'test-2026-07-04',
  date: '2026-07-04',
  time: '20:30',
  duration: 60,
  day: 4,
  month: 'Juillet',
  year: 2026,
  title: 'Concert test',
  venue: 'Salle de concert',
  address: 'Paris, 75001',
  note: 'Une belle soirée musicale.',
  price: 'Entrée libre',
};

beforeEach(() => {
  global.URL.createObjectURL = vi.fn(() => 'blob:mock');
  global.URL.revokeObjectURL = vi.fn();
});

describe('EventCard', () => {
  it('affiche le titre de l\'événement', () => {
    render(<EventCard event={mockEvent} />);
    expect(screen.getByText('Concert test')).toBeInTheDocument();
  });

  it('affiche le lieu, l\'heure et le prix', () => {
    render(<EventCard event={mockEvent} />);
    expect(screen.getByText(/Salle de concert/)).toBeInTheDocument();
    expect(screen.getByText(/20:30/)).toBeInTheDocument();
    expect(screen.getByText(/Entrée libre/)).toBeInTheDocument();
  });

  it('affiche la note de l\'événement', () => {
    render(<EventCard event={mockEvent} />);
    expect(screen.getByText('Une belle soirée musicale.')).toBeInTheDocument();
  });

  it('affiche le bouton d\'ajout à l\'agenda', () => {
    render(<EventCard event={mockEvent} />);
    expect(screen.getByRole('button', { name: /Ajouter à mon agenda/i })).toBeInTheDocument();
  });

  it('déclenche le téléchargement ICS au clic', () => {
    vi.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(() => {});
    render(<EventCard event={mockEvent} />);
    fireEvent.click(screen.getByRole('button', { name: /Ajouter à mon agenda/i }));
    expect(URL.createObjectURL).toHaveBeenCalled();
  });
});
