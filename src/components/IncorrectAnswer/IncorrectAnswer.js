import styled from 'styled-components';

const IncorrectAnswer = ({
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
        <h2>Good try, but not quite right :(</h2>
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
  }
`;

export default IncorrectAnswer;
