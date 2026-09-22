import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import ConcertPage from './pages/ConcertPage';

const App = () => (
  <BrowserRouter>
    <div className="site">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/concerts/:id" element={<ConcertPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  </BrowserRouter>
);

export default App;
