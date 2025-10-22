import { useState } from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  margin-top: 10px;
`;

const StyledDiv = styled.div`
  margin-bottom: 0.5rem;
`;

const DeleteButton = styled.button`
  margin-left: 0.5rem;
`;

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
    if (sets.length === 1) return;
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
        <StyledDiv key={set.id}>
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

          <DeleteButton type="button" onClick={() => deleteSet(i)}>
            ❌ Delete Set
          </DeleteButton>
        </StyledDiv>
      ))}

      <StyledButton type="button" onClick={addSet}>
        ➕ Add Set
      </StyledButton>
      <button type="submit">Add Exercise</button>
    </form>
  );
}
