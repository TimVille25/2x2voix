import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import ConcertDetails from '.';

const baseEvent = {
  id: 'salle-test-2026-10-20',
  date: '2026-10-20',
  times: ['20:00'],
  duration: 60,
  day: 20,
  month: 'Octobre',
  year: 2026,
  title: 'Concert de test',
  venue: 'Salle des fêtes',
  address: '1 rue Test, 70000 Vesoul',
  note: 'Un concert de test.',
  price: 'Entrée libre',
  description: '',
  links: [],
};

beforeEach(() => {
  global.URL.createObjectURL = vi.fn(() => 'blob:mock');
  global.URL.revokeObjectURL = vi.fn();
});

describe('ConcertDetails', () => {
  it('affiche le titre, le lieu et la note du concert', () => {
    render(<ConcertDetails event={baseEvent} />);
    expect(screen.getByRole('heading', { name: baseEvent.title })).toBeInTheDocument();
    expect(screen.getByText(baseEvent.venue)).toBeInTheDocument();
    expect(screen.getByText(baseEvent.note)).toBeInTheDocument();
  });

  it('déclenche le téléchargement ICS au clic sur le bouton', () => {
    vi.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(() => {});
    render(<ConcertDetails event={baseEvent} />);
    fireEvent.click(screen.getByRole('button', { name: /Ajouter à mon agenda/i }));
    expect(URL.createObjectURL).toHaveBeenCalled();
  });

  it("n'affiche pas le bouton d'ajout à l'agenda quand l'horaire n'est pas encore défini", () => {
    render(<ConcertDetails event={{ ...baseEvent, times: ['Bientôt disponible'] }} />);
    expect(screen.queryByRole('button', { name: /Ajouter à mon agenda/i })).not.toBeInTheDocument();
  });

  it("n'affiche pas de bloc description quand le champ est vide", () => {
    render(<ConcertDetails event={baseEvent} />);
    expect(document.querySelector('.concert__description')).not.toBeInTheDocument();
  });

  it('affiche la description enrichie quand elle est renseignée', () => {
    render(
      <ConcertDetails
        event={{ ...baseEvent, description: '<p>Texte <strong>détaillé</strong>.</p>' }}
      />
    );
    expect(screen.getByText('détaillé')).toBeInTheDocument();
  });

  it("n'affiche pas de liste de liens quand aucun lien n'est renseigné", () => {
    render(<ConcertDetails event={baseEvent} />);
    expect(screen.queryByRole('list')).not.toBeInTheDocument();
  });
});
