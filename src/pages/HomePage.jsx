import { useCallback, useEffect, useState } from 'react';
import WorkoutForm from '../features/workouts/WorkoutForm';
import WorkoutList from '../features/workouts/WorkoutList';
import styles from './HomePage.module.css';

const STORAGE_KEY = 'fitness-tracker-workouts';

export default function HomePage() {
  const [workouts, setWorkouts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load workouts from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);

      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          setWorkouts(parsed);
        }
      }
    } catch (err) {
      console.error('Error loading workouts from localStorage:', err);
      setError('Failed to load saved workouts.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Save workouts to localStorage whenever they change
  useEffect(() => {
    if (isLoading) return;

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(workouts));
      setError(null);
    } catch (err) {
      console.error('Error saving workouts:', err);
      setError('Failed to save workouts.');
    }
  }, [workouts, isLoading]);

  const addWorkout = useCallback(w => {
    setWorkouts(prev => [...prev, w]);
  }, []);

  const deleteWorkout = useCallback(id => {
    setWorkouts(prev => prev.filter(w => w.id !== id));
  }, []);

  const updateWorkout = useCallback((id, updatedFields) => {
    setWorkouts(prev =>
      prev.map(w => (w.id === id ? { ...w, ...updatedFields } : w))
    );
  }, []);

  if (isLoading) {
    return <div>Loading your workouts...</div>;
  }

  return (
    <div>
      <h1>Workout Tracker</h1>
      {error && <div className={styles.errorBox}>{error}</div>}
      <WorkoutForm addWorkout={addWorkout} />
      <WorkoutList
        workouts={workouts}
        deleteWorkout={deleteWorkout}
        updateWorkout={updateWorkout}
      />
    </div>
  );
}
