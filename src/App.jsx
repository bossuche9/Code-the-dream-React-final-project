import { useEffect, useState } from 'react';
import './App.css';
import Header from './shared/Header';
import { Route, Routes, useLocation } from 'react-router-dom';
import HomePage from './pages/HomePage';
import About from './pages/About';
import NotFound from './pages/NotFoundPage';
import styles from './App.module.css';
import GoalsPage from './pages/GoalsPage';
import SuggestionsPage from './pages/SuggestionsPage';

function App() {
  const [title, setTitle] = useState('Fitness Tracker');
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/') setTitle('Fitness Tracker');
    else if (location.pathname === '/about') setTitle('About');
    else if (location.pathname === '/goals') setTitle('Goals');
    else if (location.pathname === '/suggestions')
      setTitle('Exercise Suggestions');
    else setTitle('Not Found');
  }, [location]);

  return (
    <div className={styles.container}>
      <Header title={title} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/goals" element={<GoalsPage />} />
        <Route path="/suggestions" element={<SuggestionsPage />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
