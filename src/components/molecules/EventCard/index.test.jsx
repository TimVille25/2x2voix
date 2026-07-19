import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import EventCard from '.';

const mockEvent = {
  id: 'test-2026-07-04',
  date: '2026-07-04',
  times: ['20:30'],
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

  it('affiche l\'adresse complète du lieu sur plusieurs lignes', () => {
    render(<EventCard event={mockEvent} />);
    expect(screen.getByText('Paris')).toBeInTheDocument();
    expect(screen.getByText('75001')).toBeInTheDocument();
  });

  it('affiche plusieurs créneaux horaires quand le concert a lieu plusieurs fois dans la journée', () => {
    render(<EventCard event={{ ...mockEvent, times: ['11:00', '17:00'] }} />);
    expect(screen.getByText('11:00 · 17:00')).toBeInTheDocument();
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

  it('affiche un badge "Passé" pour un concert archivé', () => {
    render(<EventCard event={mockEvent} past />);
    expect(screen.getByText('Passé')).toBeInTheDocument();
  });

  it('n\'affiche pas le bouton d\'ajout à l\'agenda pour un concert passé', () => {
    render(<EventCard event={mockEvent} past />);
    expect(screen.queryByRole('button', { name: /Ajouter à mon agenda/i })).not.toBeInTheDocument();
  });
});
