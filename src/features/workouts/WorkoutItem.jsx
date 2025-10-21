import { useState } from 'react';

export default function WorkoutItem({ workout, deleteWorkout, updateWorkout }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedExercise, setEditedExercise] = useState(workout.exercise);
  const [editedSets, setEditedSets] = useState([...workout.sets]);

  const handleSetChange = (index, e) => {
    const updated = editedSets.map((set, i) =>
      i === index ? { ...set, [e.target.name]: e.target.value } : set
    );
    setEditedSets(updated);
  };

  const handleSave = () => {
    const updatedWorkout = {
      ...workout,
      exercise: editedExercise,
      sets: editedSets,
    };
    updateWorkout(workout.id, updatedWorkout);
    setIsEditing(false);
  };

  return (
    <li>
      {isEditing ? (
        <div>
          <input
            value={editedExercise}
            onChange={e => setEditedExercise(e.target.value)}
          />
          <ul>
            {editedSets.map((s, i) => (
              <li key={i}>
                <label>Set {i + 1}: </label>
                <input
                  name="reps"
                  type="number"
                  value={s.reps}
                  onChange={e => handleSetChange(i, e)}
                  placeholder="Reps"
                />
                <input
                  name="weight"
                  type="number"
                  value={s.weight}
                  onChange={e => handleSetChange(i, e)}
                  placeholder="Weight"
                />
              </li>
            ))}
          </ul>
          <button onClick={handleSave}>💾 Save</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </div>
      ) : (
        <div>
          <strong>{workout.exercise}</strong>
          <ul>
            {workout.sets.map((s, i) => (
              <li key={s.id}>
                Set {i + 1}: {s.weight} lbs x {s.reps} reps
              </li>
            ))}
          </ul>
          <button onClick={() => setIsEditing(true)}>✏️ Edit</button>
          <button onClick={() => deleteWorkout(workout.id)}>❌ Delete</button>
        </div>
      )}
    </li>
  );
}
