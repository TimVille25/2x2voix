import Icon from '../../atoms/Icon';
import { downloadICS } from '../../../utils/ics';
import './style.css';

/**
 * @param {boolean} past - masque l'action d'ajout à l'agenda pour un événement déjà passé.
 */
const EventCard = ({ event, past = false }) => (
  <article className={`event${past ? ' event--past' : ''}`}>
    <div className="event__date">
      <div className="event__date-day">{event.day}</div>
      <div className="event__date-month">{event.month.slice(0, 3)}.</div>
      <div className="event__date-year">{event.year}</div>
    </div>
    <div className="event__info">
      <h3 className="event__title">
        {event.title}
        {past && <span className="event__badge">Passé</span>}
      </h3>
      <div className="event__meta">
        <span className="event__meta-item"><Icon name="map-pin" size={14} /> {event.venue}</span>
        <span className="event__meta-item"><Icon name="clock" size={14} /> {event.time}</span>
        <span className="event__meta-item"><Icon name="ticket" size={14} /> {event.price}</span>
      </div>
      <p className="event__note">{event.note}</p>
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

export default EventCard;
