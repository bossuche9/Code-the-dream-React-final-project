export default function GoalProgress({ goal, clearGoal }) {
  const { exercise, targetWeight, targetReps } = goal;

  return (
    <div className="goal-progress">
      <h3>Current Goal</h3>
      <p>
        <strong>{exercise}</strong> — Aim for{' '}
        <strong>
          {targetWeight} lbs × {targetReps} reps
        </strong>
      </p>
      <p>Keep training consistently to hit your target!</p>
      <button onClick={clearGoal}>Clear Goal</button>
    </div>
  );
}
