import { useState, useEffect } from 'react';
import GoalForm from '../features/goals/GoalsForm.jsx';
import GoalProgress from '../features/goals/GoalProgress.jsx';

export default function GoalsPage() {
  const [goal, setGoal] = useState(null);

  useEffect(() => {
    const savedGoal = JSON.parse(localStorage.getItem('goal'));
    if (savedGoal) setGoal(savedGoal);
  }, []);

  useEffect(() => {
    if (goal) localStorage.setItem('goal', JSON.stringify(goal));
  }, [goal]);

  const setNewGoal = newGoal => {
    setGoal(newGoal);
  };

  const clearGoal = () => {
    localStorage.removeItem('goal');
    setGoal(null);
  };

  return (
    <div className="page-container">
      <h1>Workout Goals</h1>
      {!goal ? (
        <GoalForm setNewGoal={setNewGoal} />
      ) : (
        <>
          <GoalProgress goal={goal} clearGoal={clearGoal} />
        </>
      )}
    </div>
  );
}
