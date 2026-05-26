import { useEffect } from 'react';
import Nav from './components/Nav.jsx';
import Hero from './components/Hero.jsx';
import About from './components/About.jsx';
import Agenda from './components/Agenda.jsx';
import ArchDraw from './components/ArchDraw.jsx';
import Repertoire from './components/Repertoire.jsx';
import Listen from './components/Listen.jsx';
import Gallery from './components/Gallery.jsx';
import Contact from './components/Contact.jsx';
import Footer from './components/Footer.jsx';

const App = () => {
  useEffect(() => {
    document.documentElement.dataset.typo = 'modern';
  }, []);

  return (
    <div className="site">
      <Nav />
      <main>
        <Hero />
        <div className="arch-scene">
          <ArchDraw />
          <About />
          <Agenda />
        </div>
        <Repertoire />
        <Listen />
        <Gallery />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default App;
