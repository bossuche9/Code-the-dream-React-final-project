import { useEffect, useState } from 'react';

export default function SuggestionsPage() {
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const workouts = JSON.parse(localStorage.getItem('workouts')) || [];
    const exercises = workouts.map(w => w.exercise.toLowerCase());
    const unique = [...new Set(exercises)];

    const allSuggestions = {
      squat: ['Front Squat', 'Leg Press', 'Lunges'],
      bench: ['Incline Bench Press', 'Dumbbell Press', 'Push-ups'],
      deadlift: ['Romanian Deadlift', 'Barbell Rows', 'Good Mornings'],
      default: ['Planks', 'Pull-ups', 'Overhead Press', 'Curls'],
    };

    let recs = [];
    if (unique.length > 0) {
      recs = unique.flatMap(ex => allSuggestions[ex] || []);
    } else {
      recs = allSuggestions.default;
    }
    setSuggestions(recs);
  }, []);

  return (
    <div className="page-container">
      <h1>Workout Suggestions</h1>
      {suggestions.length === 0 ? (
        <p>No data yet — log some workouts first!</p>
      ) : (
        <ul className="suggestion-list">
          {suggestions.map((s, i) => (
            <li key={i}>{s}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
