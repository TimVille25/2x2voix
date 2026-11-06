import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { vi } from 'vitest';
import { downloadICS } from '../../utils/ics';
import ConcertPage from '.';

vi.mock('../../components/organisms/Nav', () => ({ default: () => <nav /> }));
vi.mock('../../components/organisms/Footer', () => ({ default: () => <footer /> }));
vi.mock('../../utils/ics', () => ({ downloadICS: vi.fn() }));

const TEST_EVENTS = [
  {
    id: 'test-concert-with-time',
    date: '2026-06-15',
    times: ['19:30'],
    duration: 60,
    day: 15,
    month: 'Juin',
    year: 2026,
    title: 'Concert de test avec horaire',
    venue: 'Salle de test',
    address: '1 rue des Tests',
    note: 'Une note de concert de test.',
    price: 'Entrée libre',
    description: 'Une description de test.',
    links: [{ label: 'Lien de test', url: 'https://example.com' }],
  },
  {
    id: 'test-concert-without-time',
    date: '2026-06-16',
    times: ['Horaire à définir'],
    duration: 60,
    day: 16,
    month: 'Juin',
    year: 2026,
    title: 'Concert de test sans horaire',
    venue: 'Autre salle de test',
    address: '2 rue des Tests',
    note: 'Une autre note de concert de test.',
    price: 'Entrée libre',
    description: '',
    links: [],
  },
];

const renderAt = (path) =>
  render(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route path="/concerts/:id" element={<ConcertPage events={TEST_EVENTS} />} />
        <Route path="/" element={<div>Accueil</div>} />
      </Routes>
    </MemoryRouter>
  );

beforeEach(() => {
  vi.clearAllMocks();
});

describe('ConcertPage', () => {
  it('affiche les informations du concert correspondant à l\'id de l\'URL', () => {
    const event = TEST_EVENTS[0];
    renderAt(`/concerts/${event.id}`);
    expect(screen.getByRole('heading', { name: event.title })).toBeInTheDocument();
    expect(screen.getByText(event.venue)).toBeInTheDocument();
    expect(screen.getByText(event.note)).toBeInTheDocument();
  });

  it('redirige vers l\'accueil quand l\'id ne correspond à aucun concert', () => {
    renderAt('/concerts/inconnu');
    expect(screen.getByText('Accueil')).toBeInTheDocument();
  });

  it('met à jour le titre du document avec le titre du concert', () => {
    const event = TEST_EVENTS[0];
    renderAt(`/concerts/${event.id}`);
    expect(document.title).toBe(`${event.title} — 2×2 Voix`);
  });

  it('déclenche le téléchargement ICS au clic sur le bouton', () => {
    const event = TEST_EVENTS[0];
    renderAt(`/concerts/${event.id}`);
    fireEvent.click(screen.getByRole('button', { name: /Ajouter à mon agenda/i }));
    expect(downloadICS).toHaveBeenCalledWith(event);
  });

  it('n\'affiche pas le bouton d\'ajout à l\'agenda quand l\'horaire n\'est pas encore défini', () => {
    const event = TEST_EVENTS[1];
    renderAt(`/concerts/${event.id}`);
    expect(screen.queryByRole('button', { name: /Ajouter à mon agenda/i })).not.toBeInTheDocument();
  });

  it('a un lien de retour vers les concerts de la page d\'accueil', () => {
    const event = TEST_EVENTS[0];
    renderAt(`/concerts/${event.id}`);
    expect(screen.getByRole('link', { name: /Retour aux concerts/i })).toHaveAttribute(
      'href',
      '/#concerts'
    );
  });

  it('n\'affiche pas de bloc description quand le champ est vide', () => {
    const event = TEST_EVENTS[1];
    renderAt(`/concerts/${event.id}`);
    expect(document.querySelector('.concert__description')).not.toBeInTheDocument();
  });

  it('n\'affiche pas de liste de liens quand aucun lien n\'est renseigné', () => {
    const event = TEST_EVENTS[1];
    renderAt(`/concerts/${event.id}`);
    expect(screen.queryByRole('list')).not.toBeInTheDocument();
  });
});
