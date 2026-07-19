import { EVENTS } from '../../../data.js';
import EventCard from '../../molecules/EventCard';
import { splitEventsByDate } from '../../../utils/events.js';
import './style.css';

const Agenda = () => {
  const { upcoming, past } = splitEventsByDate(EVENTS);

  return (
    <section id="concerts" className="section">
      <div className="section__inner">
        <h2 className="section__label">Concerts</h2>
        <div className="section__title">Prochains concerts.</div>
        <p className="section__lede">
          Concerts du quatuor vocal 2×2 Voix à Besançon et en Franche-Comté.{' '}
          Nous chantons quelques fois par an, pour des lieux et des occasions
          qui ont du sens. Voici où nous retrouver dans les mois qui viennent.
        </p>
        {upcoming.length > 0 && (
          <div className="agenda">
            {upcoming.map((e) => <EventCard key={e.id} event={e} />)}
          </div>
        )}
        {past.length > 0 && (
          <details className="agenda-archive">
            <summary className="agenda-archive__toggle">
              Concerts passés ({past.length})
            </summary>
            <div className="agenda">
              {past.map((e) => <EventCard key={e.id} event={e} past />)}
            </div>
          </details>
        )}
      </div>
    </section>
  );
};

export default Agenda;
