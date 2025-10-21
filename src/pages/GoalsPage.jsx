import { useState, useEffect } from 'react';
import GoalForm from '../features/goals/GoalsForm.jsx';
import GoalProgress from '../features/goals/GoalProgress.jsx';

const STORAGE_KEY = 'fitness-tracker-goals';

export default function GoalsPage() {
  const [goals, setGoals] = useState([]);

  // Load saved goals
  useEffect(() => {
    const savedGoals = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (Array.isArray(savedGoals)) {
      setGoals(savedGoals);
    }
  }, []);

  // Save goals when they change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(goals));
  }, [goals]);

  const addGoal = newGoal => {
    setGoals(prev => [...prev, newGoal]);
  };

  const deleteGoal = id => {
    const updated = goals.filter(g => g.id !== id);
    setGoals(updated);
  };

  const clearAllGoals = () => {
    localStorage.removeItem(STORAGE_KEY);
    setGoals([]);
  };

  return (
    <div className="page-container">
      <h1>Workout Goals</h1>
      <GoalForm setNewGoal={addGoal} />

      {goals.length === 0 ? (
        <p>No goals yet — add one above!</p>
      ) : (
        <div>
          {goals.map(goal => (
            <GoalProgress
              key={goal.id}
              goal={goal}
              clearGoal={() => deleteGoal(goal.id)}
            />
          ))}
          <button onClick={clearAllGoals} style={{ marginTop: '10px' }}>
            Clear All Goals
          </button>
        </div>
      )}
    </div>
  );
}
