import { useEffect } from 'react';
import Nav from './components/organisms/Nav';
import Hero from './components/organisms/Hero';
import About from './components/organisms/About';
import Agenda from './components/organisms/Agenda';
import Programmes from './components/organisms/Programmes';
import Listen from './components/organisms/Listen';
import Gallery from './components/organisms/Gallery';
import Contact from './components/organisms/Contact';
import Footer from './components/organisms/Footer';

const App = () => {
  useEffect(() => {
    document.documentElement.dataset.typo = 'modern';
  }, []);

  return (
    <div className="site">
      <Nav />
      <main>
        <Hero />
        <About />
        <Agenda />
        <Programmes />
        <Listen />
        <Gallery />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default App;
