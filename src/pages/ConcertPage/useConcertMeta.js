import { useEffect } from 'react';
import { getEventSchedule } from '../../utils/events';

const SITE_URL = 'https://2x2voix.fr/';

const upsertMetaContent = (selector, attrs, content) => {
  const existing = document.head.querySelector(selector);
  if (existing) {
    const previousContent = existing.getAttribute('content');
    existing.setAttribute('content', content);
    return () => existing.setAttribute('content', previousContent);
  }
  const meta = document.createElement('meta');
  Object.entries(attrs).forEach(([key, value]) => meta.setAttribute(key, value));
  meta.setAttribute('content', content);
  document.head.appendChild(meta);
  return () => meta.remove();
};

/**
 * Met à jour le <title>, la meta description, les balises Open Graph, le
 * lien canonique et les données structurées JSON-LD (MusicEvent +
 * BreadcrumbList) pendant l'affichage d'un concert, puis restaure l'état
 * précédent au démontage.
 */
const useConcertMeta = (event) => {
  useEffect(() => {
    if (!event) return undefined;

    const previousTitle = document.title;
    const pageTitle = `${event.title} — 2×2 Voix`;
    document.title = pageTitle;

    const eventUrl = `${SITE_URL}concerts/${event.id}`;
    const restoreMetas = [
      upsertMetaContent('meta[name="description"]', { name: 'description' }, event.note),
      upsertMetaContent('meta[property="og:title"]', { property: 'og:title' }, pageTitle),
      upsertMetaContent('meta[property="og:description"]', { property: 'og:description' }, event.note),
      upsertMetaContent('meta[property="og:url"]', { property: 'og:url' }, eventUrl),
    ];

    const canonical = document.createElement('link');
    canonical.rel = 'canonical';
    canonical.href = eventUrl;
    document.head.appendChild(canonical);

    const { startDate, endDate } = getEventSchedule(event);
    const musicEventLd = document.createElement('script');
    musicEventLd.type = 'application/ld+json';
    musicEventLd.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'MusicEvent',
      name: event.title,
      startDate,
      ...(endDate && { endDate }),
      eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
      eventStatus: 'https://schema.org/EventScheduled',
      image: `${SITE_URL}og-image.jpg`,
      url: eventUrl,
      description: event.note,
      location: { '@type': 'Place', name: event.venue, address: event.address },
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'EUR',
        availability: 'https://schema.org/InStock',
      },
      performer: { '@type': 'MusicGroup', name: '2×2 Voix', url: SITE_URL },
    });
    document.head.appendChild(musicEventLd);

    const breadcrumbLd = document.createElement('script');
    breadcrumbLd.type = 'application/ld+json';
    breadcrumbLd.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Accueil', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: 'Concerts', item: `${SITE_URL}#concerts` },
        { '@type': 'ListItem', position: 3, name: event.title, item: eventUrl },
      ],
    });
    document.head.appendChild(breadcrumbLd);

    return () => {
      document.title = previousTitle;
      restoreMetas.forEach((restore) => restore());
      canonical.remove();
      musicEventLd.remove();
      breadcrumbLd.remove();
    };
  }, [event]);
};

export default useConcertMeta;
