import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { vi } from 'vitest';
import ConcertPage from '.';
import { EVENTS } from '../../data.js';

vi.mock('../../components/organisms/Nav', () => ({ default: () => <nav /> }));
vi.mock('../../components/organisms/Footer', () => ({ default: () => <footer /> }));

const renderAt = (path) =>
  render(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route path="/concerts/:id" element={<ConcertPage />} />
        <Route path="/" element={<div>Accueil</div>} />
      </Routes>
    </MemoryRouter>
  );

beforeEach(() => {
  global.URL.createObjectURL = vi.fn(() => 'blob:mock');
  global.URL.revokeObjectURL = vi.fn();
});

describe('ConcertPage', () => {
  it('affiche les informations du concert correspondant à l\'id de l\'URL', () => {
    const event = EVENTS[0];
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
    const event = EVENTS[0];
    renderAt(`/concerts/${event.id}`);
    expect(document.title).toBe(`${event.title} — 2×2 Voix`);
  });

  it('déclenche le téléchargement ICS au clic sur le bouton', () => {
    vi.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(() => {});
    const event = EVENTS.find((e) => /^([01]\d|2[0-3]):[0-5]\d$/.test(e.times[0]));
    renderAt(`/concerts/${event.id}`);
    fireEvent.click(screen.getByRole('button', { name: /Ajouter à mon agenda/i }));
    expect(URL.createObjectURL).toHaveBeenCalled();
  });

  it('n\'affiche pas le bouton d\'ajout à l\'agenda quand l\'horaire n\'est pas encore défini', () => {
    const event = EVENTS.find((e) => !/^([01]\d|2[0-3]):[0-5]\d$/.test(e.times[0]));
    renderAt(`/concerts/${event.id}`);
    expect(screen.queryByRole('button', { name: /Ajouter à mon agenda/i })).not.toBeInTheDocument();
  });

  it('a un lien de retour vers les concerts de la page d\'accueil', () => {
    const event = EVENTS[0];
    renderAt(`/concerts/${event.id}`);
    expect(screen.getByRole('link', { name: /Retour aux concerts/i })).toHaveAttribute(
      'href',
      '/#concerts'
    );
  });

  it('n\'affiche pas de bloc description quand le champ est vide', () => {
    const event = EVENTS.find((e) => !e.description);
    renderAt(`/concerts/${event.id}`);
    expect(document.querySelector('.concert__description')).not.toBeInTheDocument();
  });

  it('n\'affiche pas de liste de liens quand aucun lien n\'est renseigné', () => {
    const event = EVENTS.find((e) => !e.links?.length);
    renderAt(`/concerts/${event.id}`);
    expect(screen.queryByRole('list')).not.toBeInTheDocument();
  });
});
