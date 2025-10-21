import { useCallback, useEffect, useState } from 'react';
import WorkoutForm from '../features/workouts/WorkoutForm';
import WorkoutList from '../features/workouts/WorkoutList';

export default function HomePage() {
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('workouts'));
      if (saved && Array.isArray(saved)) {
        setWorkouts(saved);
      }
    } catch (error) {
      console.error('Error loading workouts from localStorage:', error);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('workouts', JSON.stringify(workouts));
    } catch (error) {
      console.error('Error saving workouts:', error);
    }
  }, [workouts]);

  const addWorkout = useCallback(w => {
    setWorkouts(prev => [...prev, w]);
  }, []);

  const deleteWorkout = id => {
    setWorkouts(prev => prev.filter(w => w.id !== id));
  };

  const updateWorkout = (id, updatedFields) => {
    setWorkouts(prev =>
      prev.map(w => (w.id === id ? { ...w, ...updatedFields } : w))
    );
  };

  return (
    <div>
      <h1>Workout Tracker</h1>
      <WorkoutForm addWorkout={addWorkout} />
      <WorkoutList
        workouts={workouts}
        deleteWorkout={deleteWorkout}
        updateWorkout={updateWorkout}
      />
    </div>
  );
}
