import { useState, useEffect } from 'react';
import GoalForm from '../features/goals/GoalsForm.jsx';
import GoalProgress from '../features/goals/GoalProgress.jsx';
import styled from 'styled-components';

const StyledButton = styled.button`
  margin-top: 10px;
`;

const STORAGE_KEY = 'fitness-tracker-goals';

export default function GoalsPage() {
  const [goals, setGoals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load saved goals
  useEffect(() => {
    const savedGoals = localStorage.getItem(STORAGE_KEY);
    if (savedGoals) {
      try {
        const parsed = JSON.parse(savedGoals);
        if (Array.isArray(parsed)) {
          setGoals(parsed);
        }
      } catch (err) {
        console.error('Error loading goals:', err);
      }
    }
    setIsLoading(false);
  }, []);

  // Save goals when they change (skip first render)
  useEffect(() => {
    if (isLoading) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(goals));
  }, [goals, isLoading]);

  const addGoal = newGoal => {
    setGoals(prev => [...prev, newGoal]);
  };

  const deleteGoal = id => {
    setGoals(prev => prev.filter(g => g.id !== id));
  };

  const clearAllGoals = () => {
    setGoals([]);
  };

  if (isLoading) {
    return (
      <div className="page-container">
        <p>Loading goals...</p>
      </div>
    );
  }

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
          <StyledButton onClick={clearAllGoals}>Clear All Goals</StyledButton>
        </div>
      )}
    </div>
  );
}
