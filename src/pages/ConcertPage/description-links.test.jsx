import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { vi } from 'vitest';
import ConcertPage from '.';

vi.mock('../../components/organisms/Nav', () => ({ default: () => <nav /> }));
vi.mock('../../components/organisms/Footer', () => ({ default: () => <footer /> }));

vi.mock('../../data.js', () => ({
  EVENTS: [
    {
      id: 'concert-enrichi',
      date: '2026-10-10',
      times: ['20:00'],
      duration: 60,
      day: 10, month: 'Octobre', year: 2026,
      title: 'Concert enrichi',
      venue: 'Salle des fêtes',
      address: '1 rue Test, 70000 Vesoul',
      note: 'Un concert de test.',
      price: 'Entrée libre',
      description: '<p>Un texte plus <strong>détaillé</strong> sur ce concert.</p>',
      links: [
        { label: "Site de l'organisateur", url: 'https://organisateur.example/concert' },
        { label: 'Article de presse', url: 'https://presse.example/article' },
      ],
    },
  ],
}));

const renderAt = (path) =>
  render(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route path="/concerts/:id" element={<ConcertPage />} />
        <Route path="/" element={<div>Accueil</div>} />
      </Routes>
    </MemoryRouter>
  );

describe('ConcertPage avec description et liens', () => {
  it('affiche la description enrichie quand elle est renseignée', () => {
    renderAt('/concerts/concert-enrichi');
    expect(screen.getByText(/Un texte plus/)).toBeInTheDocument();
    expect(screen.getByText('détaillé')).toBeInTheDocument();
  });

  it('affiche les liens externes avec label et cible sécurisée', () => {
    renderAt('/concerts/concert-enrichi');
    const link = screen.getByRole('link', { name: /Site de l'organisateur/i });
    expect(link).toHaveAttribute('href', 'https://organisateur.example/concert');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    expect(screen.getByRole('link', { name: /Article de presse/i })).toBeInTheDocument();
  });
});
