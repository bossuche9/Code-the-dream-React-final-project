import { useState } from 'react';

export default function WorkoutForm({ addWorkout }) {
  const [exercise, setExercise] = useState('');
  const [sets, setSets] = useState([{ id: Date.now(), reps: '', weight: '' }]);

  const handleSetChange = (index, e) => {
    const updatedSets = sets.map((s, i) =>
      i === index ? { ...s, [e.target.name]: e.target.value } : s
    );
    setSets(updatedSets);
  };

  const addSet = () => {
    setSets([
      ...sets,
      { id: Date.now() + Math.random(), reps: '', weight: '' },
    ]);
  };

  const deleteSet = index => {
    if (sets.length === 1) return; // keep at least one set
    const updated = sets.filter((_, i) => i !== index);
    setSets(updated);
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!exercise.trim()) return alert('Please enter an exercise');

    const workout = {
      id: Date.now(),
      exercise,
      sets,
      date: new Date().toLocaleDateString(),
    };

    addWorkout(workout);
    setExercise('');
    setSets([{ id: Date.now(), reps: '', weight: '' }]);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={exercise}
        onChange={e => setExercise(e.target.value)}
        placeholder="Exercise name"
        required
      />

      {sets.map((set, i) => (
        <div key={set.id} style={{ marginBottom: '0.5rem' }}>
          <label>Set {i + 1}: </label>
          <input
            name="weight"
            type="number"
            value={set.weight}
            onChange={e => handleSetChange(i, e)}
            placeholder="Weight (lbs)"
            required
          />
          <input
            name="reps"
            type="number"
            value={set.reps}
            onChange={e => handleSetChange(i, e)}
            placeholder="Reps"
            required
          />

          <button
            type="button"
            onClick={() => deleteSet(i)}
            style={{ marginLeft: '0.5rem', color: 'red' }}
          >
            ❌
          </button>
        </div>
      ))}

      <button type="button" onClick={addSet}>
        ➕ Add Set
      </button>
      <button type="submit">Add Exercise</button>
    </form>
  );
}
