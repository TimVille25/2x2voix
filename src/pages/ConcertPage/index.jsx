import { useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import Nav from '../../components/organisms/Nav';
import Footer from '../../components/organisms/Footer';
import Icon from '../../components/atoms/Icon';
import { EVENTS } from '../../data.js';
import { getEventSchedule, hasKnownStartTime } from '../../utils/events';
import { downloadICS } from '../../utils/ics';
import './style.css';

const SITE_URL = 'https://2x2voix.fr/';

/**
 * Met à jour le <title>, la meta description et les données structurées
 * JSON-LD pendant l'affichage de la page, puis restaure l'état précédent.
 */
const useConcertMeta = (event) => {
  useEffect(() => {
    if (!event) return undefined;

    const previousTitle = document.title;
    document.title = `${event.title} — 2×2 Voix`;

    const description = document.createElement('meta');
    description.name = 'description';
    description.content = event.note;
    document.head.appendChild(description);

    const { startDate, endDate } = getEventSchedule(event);
    const jsonLd = document.createElement('script');
    jsonLd.type = 'application/ld+json';
    jsonLd.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'MusicEvent',
      name: event.title,
      startDate,
      ...(endDate && { endDate }),
      eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
      eventStatus: 'https://schema.org/EventScheduled',
      image: `${SITE_URL}og-image.jpg`,
      url: `${SITE_URL}concerts/${event.id}`,
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
    document.head.appendChild(jsonLd);

    return () => {
      document.title = previousTitle;
      description.remove();
      jsonLd.remove();
    };
  }, [event]);
};

const ConcertPage = () => {
  const { id } = useParams();
  const event = EVENTS.find((e) => e.id === id);

  useConcertMeta(event);

  if (!event) return <Navigate to="/" replace />;

  const addressLines = event.address.split(',').map((line) => line.trim());

  return (
    <>
      <Nav />
      <main>
        <section className="section">
          <div className="section__inner concert">
            <Link to="/#concerts" className="concert__back">← Retour aux concerts</Link>

            <article className="concert__card">
              <div className="concert__date">
                <div className="concert__date-day">{event.day}</div>
                <div className="concert__date-month">{event.month}</div>
                <div className="concert__date-year">{event.year}</div>
              </div>

              <div className="concert__info">
                <h1 className="concert__title">{event.title}</h1>

                <div className="concert__meta">
                  <span className="concert__meta-item">
                    <Icon name="map-pin" size={16} /> {event.venue}
                  </span>
                  <span className="concert__meta-item">
                    <Icon name="clock" size={16} /> {event.times.join(' · ')}
                  </span>
                  <span className="concert__meta-item">
                    <Icon name="ticket" size={16} /> {event.price}
                  </span>
                </div>

                <address className="concert__address">
                  {addressLines.map((line) => (
                    <span key={line}>{line}</span>
                  ))}
                </address>

                <p className="concert__note">{event.note}</p>

                {event.description && (
                  <div
                    className="concert__description"
                    dangerouslySetInnerHTML={{ __html: event.description }}
                  />
                )}

                {event.links?.length > 0 && (
                  <ul className="concert__links">
                    {event.links.map((link) => (
                      <li key={link.url}>
                        <a
                          className="concert__link"
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Icon name="external-link" size={14} /> {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}

                {hasKnownStartTime(event) && (
                  <button className="btn btn--secondary" onClick={() => downloadICS(event)}>
                    <Icon name="download" size={16} /> Ajouter à mon agenda
                  </button>
                )}
              </div>
            </article>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default ConcertPage;
