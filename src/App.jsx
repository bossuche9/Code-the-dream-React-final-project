import { useCallback, useEffect, useState } from 'react';
import './App.css';
import Header from './shared/Header';
import { Route, Routes, useLocation } from 'react-router-dom';
import HomePage from './pages/HomePage';
import About from './pages/About';
import NotFound from './pages/NotFoundPage';

function App() {
  const [title, setTitle] = useState('Fitness Tracker');
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/') setTitle('Fitness Tracker');
    else if (location.pathname === '/about') setTitle('About');
    else setTitle('Not Found');
  }, [location]);

  return (
    <div>
      <Header title={title} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
