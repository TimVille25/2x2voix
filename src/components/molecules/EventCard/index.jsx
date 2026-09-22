import Icon from '../../atoms/Icon';
import { downloadICS } from '../../../utils/ics';
import './style.css';

const TIME_REGEX = /^([01]\d|2[0-3]):[0-5]\d$/;
const SITE_URL = 'https://2x2voix.fr/';

const addMinutes = (date, time, minutes) => {
  const [Y, M, D] = date.split('-').map(Number);
  const [h, mi] = time.split(':').map(Number);
  const d = new Date(Y, M - 1, D, h, mi + minutes);
  const pad = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}:00`;
};

/**
 * @param {boolean} past - masque l'action d'ajout à l'agenda pour un événement déjà passé.
 */
const EventCard = ({ event, past = false }) => {
  const addressLines = event.address.split(',').map((line) => line.trim());
  const hasStartTime = TIME_REGEX.test(event.times[0]);
  const startDate = hasStartTime ? `${event.date}T${event.times[0]}:00` : event.date;
  const endDate = hasStartTime ? addMinutes(event.date, event.times[0], event.duration) : null;

  return (
    <article
      className={`event${past ? ' event--past' : ''}`}
      itemScope
      itemType="https://schema.org/MusicEvent"
    >
      <meta itemProp="name" content={event.title} />
      <meta itemProp="startDate" content={startDate} />
      {endDate && <meta itemProp="endDate" content={endDate} />}
      <meta itemProp="eventAttendanceMode" content="https://schema.org/OfflineEventAttendanceMode" />
      <meta itemProp="eventStatus" content="https://schema.org/EventScheduled" />
      <meta itemProp="image" content={`${SITE_URL}og-image.jpg`} />
      <meta itemProp="url" content={`${SITE_URL}#concerts`} />
      <div hidden itemProp="performer" itemScope itemType="https://schema.org/MusicGroup">
        <meta itemProp="name" content="2×2 Voix" />
        <meta itemProp="url" content={SITE_URL} />
      </div>
      <div className="event__date">
        <time datetime={event.date}>
          <div className="event__date-day">{event.day}</div>
          <div className="event__date-month">{event.month.slice(0, 3)}.</div>
          <div className="event__date-year">{event.year}</div>
        </time>
      </div>
      <div className="event__info">
        <h3 className="event__title">
          {event.title}
          {past && <span className="event__badge">Passé</span>}
        </h3>
        <div className="event__location-row">
          <div className="event__location">
            <Icon name="map-pin" size={14} />
            <span className="event__location-text" itemProp="location" itemScope itemType="https://schema.org/Place">
              <meta itemProp="address" content={event.address} />
              <span className="event__venue" itemProp="name">{event.venue}</span>
              {addressLines.map((line) => (
                <span className="event__address-line" key={line}>{line}</span>
              ))}
            </span>
          </div>
          <span className="event__meta-item event__time"><Icon name="clock" size={14} /> {event.times.join(' · ')}</span>
        </div>
        <div className="event__meta">
          <span className="event__meta-item" itemProp="offers" itemScope itemType="https://schema.org/Offer">
            <Icon name="ticket" size={14} /> {event.price}
            <meta itemProp="price" content="0" />
            <meta itemProp="priceCurrency" content="EUR" />
            <meta itemProp="availability" content="https://schema.org/InStock" />
          </span>
        </div>
        <p className="event__note" itemProp="description">{event.note}</p>
      </div>
      {!past && (
        <div className="event__actions">
          <button className="btn btn--secondary btn--sm" onClick={() => downloadICS(event)}>
            <Icon name="download" size={14} /> Ajouter à mon agenda
          </button>
        </div>
      )}
    </article>
  );
};

export default EventCard;
