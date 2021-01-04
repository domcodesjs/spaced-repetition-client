import styled from 'styled-components';

const CorrectAnswer = ({
  totalScore,
  prevWord,
  correctAnswer,
  guess,
  nextQuestion
}) => {
  return (
    <>
      <StyledScore className='DisplayScore'>
        <p>Your total score is: {totalScore}</p>
        <h2>You were correct! :D</h2>
      </StyledScore>
      <StyledFeedback className='DisplayFeedback'>
        <p>
          The correct translation for {prevWord} was {correctAnswer} and you
          chose {guess}!
        </p>
        <button onClick={nextQuestion}>Try another word!</button>
      </StyledFeedback>
    </>
  );
};

const StyledScore = styled.div`
  text-align: center;
`;

const StyledFeedback = styled.div`
  text-align: center;
  button {
    width: 100%;
    height: 4.8rem;
    cursor: pointer;
    background: #2e8540;
    color: #fff;
    border: none;
  }
`;

export default CorrectAnswer;
