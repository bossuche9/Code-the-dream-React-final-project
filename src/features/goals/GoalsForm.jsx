import { useState } from 'react';

export default function GoalForm({ setNewGoal }) {
  const [form, setForm] = useState({
    exercise: '',
    targetWeight: '',
    targetReps: '',
  });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!form.exercise) return alert('Please enter an exercise');
    setNewGoal({ ...form, id: Date.now(), progress: 0 });
  };

  return (
    <form onSubmit={handleSubmit} className="goal-form">
      <input
        name="exercise"
        value={form.exercise}
        onChange={handleChange}
        placeholder="Exercise (e.g., Bench Press)"
        required
      />
      <input
        name="targetWeight"
        type="number"
        value={form.targetWeight}
        onChange={handleChange}
        placeholder="Target Weight (lbs)"
      />
      <input
        name="targetReps"
        type="number"
        value={form.targetReps}
        onChange={handleChange}
        placeholder="Target Reps"
      />
      <button type="submit">Set Goal</button>
    </form>
  );
}
