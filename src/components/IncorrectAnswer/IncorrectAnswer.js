const IncorrectAnswer = ({
  totalScore,
  prevWord,
  correctAnswer,
  guess,
  nextQuestion
}) => {
  return (
    <>
      <div className='DisplayScore'>
        <p>Your total score is: {totalScore}</p>
        <h2>Good try, but not quite right :(</h2>
      </div>
      <div className='DisplayFeedback'>
        <p>
          The correct translation for {prevWord} was {correctAnswer} and you
          chose {guess}!
        </p>
        <button onClick={nextQuestion}>Try another word!</button>
      </div>
    </>
  );
};

export default IncorrectAnswer;
