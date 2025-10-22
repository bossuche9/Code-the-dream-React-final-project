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

    // Create the new goal
    const newGoal = {
      ...form,
      id: Date.now(),
      progress: 0,
    };

    // Add the goal
    setNewGoal(newGoal);

    // Reset the form after submission
    setForm({
      exercise: '',
      targetWeight: '',
      targetReps: '',
    });
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
      <button type="submit">Add Goal(s)</button>
    </form>
  );
}
