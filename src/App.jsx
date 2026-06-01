import { lazy, Suspense } from 'react';
import Nav from './components/organisms/Nav';
import Hero from './components/organisms/Hero';
import About from './components/organisms/About';

const Agenda = lazy(() => import('./components/organisms/Agenda'));
const Programmes = lazy(() => import('./components/organisms/Programmes'));
const Listen = lazy(() => import('./components/organisms/Listen'));
const Gallery = lazy(() => import('./components/organisms/Gallery'));
const Contact = lazy(() => import('./components/organisms/Contact'));
const Footer = lazy(() => import('./components/organisms/Footer'));

const App = () => {
  return (
    <div className="site">
      <Nav />
      <main>
        <Hero />
        <About />
        <Suspense fallback={null}>
          <Agenda />
          <Programmes />
          <Listen />
          <Gallery />
          <Contact />
        </Suspense>
      </main>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </div>
  );
};

export default App;
