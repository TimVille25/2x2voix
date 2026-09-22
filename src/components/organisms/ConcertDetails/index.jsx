import Icon from '../../atoms/Icon';
import TicketStub from '../../molecules/TicketStub';
import ConcertMetaItem from '../../molecules/ConcertMetaItem';
import LinkList from '../../molecules/LinkList';
import { hasKnownStartTime } from '../../../utils/events';
import { downloadICS } from '../../../utils/ics';
import './style.css';

const ConcertDetails = ({ event }) => {
  const addressLines = event.address.split(',').map((line) => line.trim());

  return (
    <div className="concert">
      <p className="section__label">Concert</p>

      <article className="concert__card">
        <TicketStub day={event.day} month={event.month} year={event.year} />
        <div className="concert__perforation" aria-hidden="true" />

        <div className="concert__info">
          <h1 className="concert__title">{event.title}</h1>

          <div className="concert__meta">
            <ConcertMetaItem icon="map-pin">{event.venue}</ConcertMetaItem>
            <ConcertMetaItem icon="clock">{event.times.join(' · ')}</ConcertMetaItem>
            <ConcertMetaItem icon="ticket">{event.price}</ConcertMetaItem>
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

          <LinkList links={event.links} />

          {hasKnownStartTime(event) && (
            <button className="btn btn--secondary" onClick={() => downloadICS(event)}>
              <Icon name="download" size={16} /> Ajouter à mon agenda
            </button>
          )}
        </div>
      </article>
    </div>
  );
};

export default ConcertDetails;
