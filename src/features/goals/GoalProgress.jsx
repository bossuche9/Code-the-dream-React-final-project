export default function GoalProgress({ goal, clearGoal }) {
  const { exercise, targetWeight, targetReps } = goal;

  return (
    <div
      className="goal-progress"
      style={{
        border: '1px solid #ccc',
        padding: '10px',
        marginBottom: '10px',
      }}
    >
      <h3>{exercise}</h3>
      <p>
        Target: {targetWeight} lbs × {targetReps} reps
      </p>
      <button onClick={clearGoal}>Delete Goal</button>
    </div>
  );
}
