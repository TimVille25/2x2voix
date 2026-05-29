import { EVENTS } from '../../../data.js';
import EventCard from '../../molecules/EventCard';
import './style.css';

const Agenda = () => (
  <section id="concerts" className="section">
    <div className="section__inner">
      <h2 className="section__label">Concerts</h2>
      <div className="section__title">Prochains concerts.</div>
      <p className="section__lede">
        Concerts du quatuor vocal 2×2 Voix à Besançon et en Franche-Comté.{' '}
        Nous chantons quelques fois par an, pour des lieux et des occasions
        qui ont du sens. Voici où nous retrouver dans les mois qui viennent.
      </p>
      <div className="agenda">
        {EVENTS.map((e) => <EventCard key={e.id} event={e} />)}
      </div>
    </div>
  </section>
);

export default Agenda;
