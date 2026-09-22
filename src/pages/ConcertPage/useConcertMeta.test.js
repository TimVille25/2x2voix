import { renderHook, cleanup } from '@testing-library/react';
import useConcertMeta from './useConcertMeta';

const event = {
  id: 'salle-test-2026-10-20',
  date: '2026-10-20',
  times: ['20:00'],
  duration: 60,
  title: 'Concert de test',
  venue: 'Salle des fêtes',
  address: '1 rue Test, 70000 Vesoul',
  note: 'Un concert de test.',
};

afterEach(cleanup);

describe('useConcertMeta', () => {
  it('met à jour le titre du document', () => {
    renderHook(() => useConcertMeta(event));
    expect(document.title).toBe('Concert de test — 2×2 Voix');
  });

  it('restaure le titre précédent au démontage', () => {
    document.title = 'Titre initial';
    const { unmount } = renderHook(() => useConcertMeta(event));
    unmount();
    expect(document.title).toBe('Titre initial');
  });

  it("met à jour la meta description et les balises Open Graph existantes sans les dupliquer", () => {
    const description = document.createElement('meta');
    description.name = 'description';
    description.content = 'Description du site';
    document.head.appendChild(description);

    const ogTitle = document.createElement('meta');
    ogTitle.setAttribute('property', 'og:title');
    ogTitle.setAttribute('content', 'Titre du site');
    document.head.appendChild(ogTitle);

    const { unmount } = renderHook(() => useConcertMeta(event));

    expect(document.querySelectorAll('meta[name="description"]')).toHaveLength(1);
    expect(document.querySelector('meta[name="description"]')).toHaveAttribute('content', event.note);
    expect(document.querySelector('meta[property="og:title"]')).toHaveAttribute(
      'content',
      'Concert de test — 2×2 Voix'
    );

    unmount();
    expect(document.querySelector('meta[name="description"]')).toHaveAttribute(
      'content',
      'Description du site'
    );
    expect(document.querySelector('meta[property="og:title"]')).toHaveAttribute(
      'content',
      'Titre du site'
    );

    description.remove();
    ogTitle.remove();
  });

  it("ajoute un lien canonique vers l'URL du concert puis le retire au démontage", () => {
    const { unmount } = renderHook(() => useConcertMeta(event));
    expect(document.querySelector('link[rel="canonical"]')).toHaveAttribute(
      'href',
      'https://2x2voix.fr/concerts/salle-test-2026-10-20'
    );
    unmount();
    expect(document.querySelector('link[rel="canonical"]')).not.toBeInTheDocument();
  });

  it('injecte les données structurées MusicEvent et BreadcrumbList', () => {
    const { unmount } = renderHook(() => useConcertMeta(event));
    const scripts = [...document.head.querySelectorAll('script[type="application/ld+json"]')];
    const types = scripts.map((s) => JSON.parse(s.textContent)['@type']);
    expect(types).toEqual(expect.arrayContaining(['MusicEvent', 'BreadcrumbList']));

    unmount();
    expect(document.head.querySelectorAll('script[type="application/ld+json"]')).toHaveLength(0);
  });
});
