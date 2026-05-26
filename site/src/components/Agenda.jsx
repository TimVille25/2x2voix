import { EVENTS } from '../data.js';
import Icon from './Icon.jsx';

const buildICS = (event) => {
  const start = event.date.replace(/-/g, '') + 'T' + event.time.replace(':', '') + '00';
  const [Y, M, D] = event.date.split('-').map(Number);
  const [h, mi] = event.time.split(':').map(Number);
  const endDate = new Date(Date.UTC(Y, M - 1, D, h, mi));
  endDate.setUTCMinutes(endDate.getUTCMinutes() + event.duration);
  const pad = (n) => String(n).padStart(2, '0');
  const end = `${endDate.getUTCFullYear()}${pad(endDate.getUTCMonth()+1)}${pad(endDate.getUTCDate())}T${pad(endDate.getUTCHours())}${pad(endDate.getUTCMinutes())}00`;
  const dtstamp = new Date().toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  const escape = (s) => s.replace(/[,;]/g, (m) => '\\' + m).replace(/\n/g, '\\n');
  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//2x2 Voix//Site//FR',
    'BEGIN:VEVENT',
    `UID:${event.id}@2x2voix`,
    `DTSTAMP:${dtstamp}`,
    `DTSTART;TZID=Europe/Paris:${start}`,
    `DTEND;TZID=Europe/Paris:${end}`,
    `SUMMARY:2x2 Voix — ${escape(event.title)}`,
    `LOCATION:${escape(event.venue + ', ' + event.address)}`,
    `DESCRIPTION:${escape(event.note)}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');
};

const downloadICS = (event) => {
  const ics = buildICS(event);
  const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `2x2voix-${event.id}.ics`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
};

const EventCard = ({ event }) => (
  <article className="event">
    <div className="event__date">
      <div className="event__date-day">{event.day}</div>
      <div className="event__date-month">{event.month.slice(0, 3)}.</div>
      <div className="event__date-year">{event.year}</div>
    </div>
    <div className="event__info">
      <h3 className="event__title">{event.title}</h3>
      <div className="event__meta">
        <span className="event__meta-item"><Icon name="map-pin" size={14} /> {event.venue}</span>
        <span className="event__meta-item"><Icon name="clock" size={14} /> {event.time}</span>
        <span className="event__meta-item"><Icon name="ticket" size={14} /> {event.price}</span>
      </div>
      <p className="event__note">{event.note}</p>
    </div>
    <div className="event__actions">
      <button className="btn btn--secondary btn--sm" onClick={() => downloadICS(event)}>
        <Icon name="download" size={14} /> Ajouter à mon agenda
      </button>
    </div>
  </article>
);

const Agenda = () => (
  <section id="agenda" className="section">
    <div className="section__label">Concerts</div>
    <h2 className="section__title">Prochains concerts.</h2>
    <p className="section__lede">
      Nous chantons quelques fois par an, pour des lieux et des occasions
      qui ont du sens. Voici où nous retrouver dans les mois qui viennent.
    </p>
    <div className="agenda">
      {EVENTS.map(e => <EventCard key={e.id} event={e} />)}
    </div>
  </section>
);

export default Agenda;
