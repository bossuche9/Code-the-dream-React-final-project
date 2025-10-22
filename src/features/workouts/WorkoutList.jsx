import WorkoutItem from './WorkoutItem';

export default function WorkoutList({
  workouts,
  deleteWorkout,
  updateWorkout,
}) {
  if (workouts.length === 0) return <p>No workouts logged yet!</p>;

  return (
    <ul>
      {workouts.map(w => (
        <WorkoutItem
          key={w.id}
          workout={w}
          deleteWorkout={deleteWorkout}
          updateWorkout={updateWorkout}
        />
      ))}
    </ul>
  );
}
