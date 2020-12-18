const CorrectAnswer = ({
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
        <h2>You were correct! :D</h2>
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

export default CorrectAnswer;
