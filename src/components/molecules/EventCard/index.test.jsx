import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';
import EventCard from '.';

const renderEventCard = (props) => render(<EventCard {...props} />, { wrapper: MemoryRouter });

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
    renderEventCard({ event: mockEvent });
    expect(screen.getByText('Concert test')).toBeInTheDocument();
  });

  it('lie le titre vers la page dédiée du concert', () => {
    renderEventCard({ event: mockEvent });
    expect(screen.getByRole('link', { name: 'Concert test' })).toHaveAttribute(
      'href',
      '/concerts/test-2026-07-04'
    );
  });

  it('n\'affiche pas le bouton d\'ajout à l\'agenda quand l\'horaire n\'est pas encore défini', () => {
    renderEventCard({ event: { ...mockEvent, times: ['Bientôt disponible'] } });
    expect(screen.queryByRole('button', { name: /Ajouter à mon agenda/i })).not.toBeInTheDocument();
  });

  it('affiche le lieu, l\'heure et le prix', () => {
    renderEventCard({ event: mockEvent });
    expect(screen.getByText(/Salle de concert/)).toBeInTheDocument();
    expect(screen.getByText(/20:30/)).toBeInTheDocument();
    expect(screen.getByText(/Entrée libre/)).toBeInTheDocument();
  });

  it('affiche l\'adresse complète du lieu sur plusieurs lignes', () => {
    renderEventCard({ event: mockEvent });
    expect(screen.getByText('Paris')).toBeInTheDocument();
    expect(screen.getByText('75001')).toBeInTheDocument();
  });

  it('affiche plusieurs créneaux horaires quand le concert a lieu plusieurs fois dans la journée', () => {
    renderEventCard({ event: { ...mockEvent, times: ['11:00', '17:00'] } });
    expect(screen.getByText('11:00 · 17:00')).toBeInTheDocument();
  });

  it('affiche la note de l\'événement', () => {
    renderEventCard({ event: mockEvent });
    expect(screen.getByText('Une belle soirée musicale.')).toBeInTheDocument();
  });

  it('affiche le bouton d\'ajout à l\'agenda', () => {
    renderEventCard({ event: mockEvent });
    expect(screen.getByRole('button', { name: /Ajouter à mon agenda/i })).toBeInTheDocument();
  });

  it('déclenche le téléchargement ICS au clic', () => {
    vi.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(() => {});
    renderEventCard({ event: mockEvent });
    fireEvent.click(screen.getByRole('button', { name: /Ajouter à mon agenda/i }));
    expect(URL.createObjectURL).toHaveBeenCalled();
  });

  it('affiche un badge "Passé" pour un concert archivé', () => {
    renderEventCard({ event: mockEvent, past: true });
    expect(screen.getByText('Passé')).toBeInTheDocument();
  });

  it('n\'affiche pas le bouton d\'ajout à l\'agenda pour un concert passé', () => {
    renderEventCard({ event: mockEvent, past: true });
    expect(screen.queryByRole('button', { name: /Ajouter à mon agenda/i })).not.toBeInTheDocument();
  });

  describe('données structurées Schema.org', () => {
    it('marque l\'article comme un MusicEvent', () => {
      const { container } = renderEventCard({ event: mockEvent });
      const article = container.querySelector('article');
      expect(article).toHaveAttribute('itemscope');
      expect(article).toHaveAttribute('itemtype', 'https://schema.org/MusicEvent');
    });

    it('renseigne le nom, la date de début et la date de fin calculée à partir de la durée', () => {
      const { container } = renderEventCard({ event: mockEvent });
      expect(container.querySelector('meta[itemprop="name"]')).toHaveAttribute('content', 'Concert test');
      expect(container.querySelector('meta[itemprop="startDate"]')).toHaveAttribute('content', '2026-07-04T20:30:00');
      expect(container.querySelector('meta[itemprop="endDate"]')).toHaveAttribute('content', '2026-07-04T21:30:00');
    });

    it('n\'expose pas de date de fin quand l\'horaire n\'est pas encore défini', () => {
      const { container } = renderEventCard({ event: { ...mockEvent, times: ['Bientôt disponible'] } });
      expect(container.querySelector('meta[itemprop="startDate"]')).toHaveAttribute('content', '2026-07-04');
      expect(container.querySelector('meta[itemprop="endDate"]')).not.toBeInTheDocument();
    });

    it('renseigne le mode de participation et le statut de l\'événement', () => {
      const { container } = renderEventCard({ event: mockEvent });
      expect(container.querySelector('meta[itemprop="eventAttendanceMode"]')).toHaveAttribute(
        'content',
        'https://schema.org/OfflineEventAttendanceMode'
      );
      expect(container.querySelector('meta[itemprop="eventStatus"]')).toHaveAttribute(
        'content',
        'https://schema.org/EventScheduled'
      );
    });

    it('renseigne l\'image et l\'url de l\'événement', () => {
      const { container } = renderEventCard({ event: mockEvent });
      expect(container.querySelector('meta[itemprop="image"]')).toHaveAttribute(
        'content',
        'https://2x2voix.fr/og-image.jpg'
      );
      expect(container.querySelector('meta[itemprop="url"]')).toHaveAttribute(
        'content',
        'https://2x2voix.fr/concerts/test-2026-07-04'
      );
    });

    it('renseigne le groupe interprète 2×2 Voix', () => {
      const { container } = renderEventCard({ event: mockEvent });
      const performer = container.querySelector('[itemprop="performer"]');
      expect(performer).toHaveAttribute('itemtype', 'https://schema.org/MusicGroup');
      expect(performer.querySelector('meta[itemprop="name"]')).toHaveAttribute('content', '2×2 Voix');
    });

    it('renseigne le lieu (Place) avec son nom et son adresse complète', () => {
      const { container } = renderEventCard({ event: mockEvent });
      const location = container.querySelector('[itemprop="location"]');
      expect(location).toHaveAttribute('itemtype', 'https://schema.org/Place');
      expect(location.querySelector('[itemprop="name"]')).toHaveTextContent('Salle de concert');
      expect(location.querySelector('meta[itemprop="address"]')).toHaveAttribute('content', 'Paris, 75001');
    });

    it('renseigne l\'offre (Offer) avec un prix libre en euros', () => {
      const { container } = renderEventCard({ event: mockEvent });
      const offer = container.querySelector('[itemprop="offers"]');
      expect(offer).toHaveAttribute('itemtype', 'https://schema.org/Offer');
      expect(offer.querySelector('meta[itemprop="price"]')).toHaveAttribute('content', '0');
      expect(offer.querySelector('meta[itemprop="priceCurrency"]')).toHaveAttribute('content', 'EUR');
      expect(offer.querySelector('meta[itemprop="availability"]')).toHaveAttribute(
        'content',
        'https://schema.org/InStock'
      );
    });
  });
});
