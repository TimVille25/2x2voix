import { useParams, Link, Navigate } from 'react-router-dom';
import Nav from '../../components/organisms/Nav';
import Footer from '../../components/organisms/Footer';
import ConcertDetails from '../../components/organisms/ConcertDetails';
import useConcertMeta from './useConcertMeta';
import { EVENTS } from '../../data.js';
import './style.css';

const ConcertPage = () => {
  const { id } = useParams();
  const event = EVENTS.find((e) => e.id === id);

  useConcertMeta(event);

  if (!event) return <Navigate to="/" replace />;

  return (
    <>
      <Nav />
      <main>
        <section className="section">
          <div className="section__inner">
            <Link to="/#concerts" className="concert-page__back">← Retour aux concerts</Link>
            <ConcertDetails event={event} />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default ConcertPage;
