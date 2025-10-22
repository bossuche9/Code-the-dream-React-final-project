import styled from 'styled-components';

const StyledDiv = styled.div`
  border: 1px solid #ccc;
  padding: 10px;
  marginbottom: 10px;
`;

export default function GoalProgress({ goal, clearGoal }) {
  const { exercise, targetWeight, targetReps } = goal;

  return (
    <StyledDiv className="goal-progress">
      <h3>{exercise}</h3>
      <p>
        Target: {targetWeight} lbs × {targetReps} reps
      </p>
      <button onClick={clearGoal}>Delete Goal</button>
    </StyledDiv>
  );
}
