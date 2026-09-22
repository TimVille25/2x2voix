import './style.css';

const TicketStub = ({ day, month, year }) => (
  <div className="ticket-stub">
    <div className="ticket-stub__day">{day}</div>
    <div className="ticket-stub__month">{month}</div>
    <div className="ticket-stub__year">{year}</div>
  </div>
);

export default TicketStub;
