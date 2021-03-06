import { useEffect, useState } from 'react';
import styled from 'styled-components';
import config from '../../config';
import IncorrectAnswer from '../../components/IncorrectAnswer/IncorrectAnswer';
import CorrectAnswer from '../../components/CorrectAnswer/CorrectAnswer';

const LearningRoute = () => {
  const [nextWord, setNextWord] = useState(null);
  const [wordCorrectCount, setWordCorrectCount] = useState(null);
  const [wordIncorrectCount, setWordIncorrectCount] = useState(null);
  const [totalScore, setTotalScore] = useState(null);
  const [guess, setGuess] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [correctAnswer, setCorrectAnswer] = useState(null);
  const [prevWord, setPrevWord] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);

  useEffect(() => {
    getLanguageHead();
  }, []);

  const getLanguageHead = async () => {
    const token = localStorage.getItem('blogful-client-auth-token');

    const res = await fetch(`${config.API_ENDPOINT}/language/head`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
      }
    });
    const data = await res.json();
    setNextWord(data.nextWord);
    setWordCorrectCount(data.wordCorrectCount);
    setWordIncorrectCount(data.wordIncorrectCount);
    setTotalScore(data.totalScore);
    return setLoaded(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('blogful-client-auth-token');
    const res = await fetch(`${config.API_ENDPOINT}/language/guess`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
      },
      body: JSON.stringify({ guess })
    });
    const data = await res.json();
    setPrevWord(nextWord);
    setNextWord(data.nextWord);
    setCorrectAnswer(data.answer);
    setWordCorrectCount(data.wordCorrectCount);
    setWordIncorrectCount(data.wordIncorrectCount);
    setTotalScore(data.totalScore);
    return setIsCorrect(data.isCorrect);
  };

  const renderQuestion = () => {
    return (
      <>
        <StyledDiv>
          <h2>Translate the word:</h2>
          <span>{nextWord}</span>
        </StyledDiv>
        <StyledForm onSubmit={handleSubmit}>
          <label htmlFor='learn-guess-input'>
            What's the translation for this word?
          </label>
          <input
            type='text'
            id='learn-guess-input'
            required
            onChange={(e) => setGuess(e.target.value)}
          />
          <button type='submit'>Submit your answer</button>
        </StyledForm>
        <StyledDivTwo>
          <p>Your total score is: {totalScore}</p>
          <p>You have answered this word correctly {wordCorrectCount} times.</p>
          <p>
            You have answered this word incorrectly {wordIncorrectCount} times.
          </p>
        </StyledDivTwo>
      </>
    );
  };

  const render = () => {
    if (isCorrect === null) {
      return renderQuestion();
    } else if (isCorrect === false) {
      return (
        <IncorrectAnswer
          totalScore={totalScore}
          prevWord={prevWord}
          correctAnswer={correctAnswer}
          guess={guess}
          nextQuestion={() => setIsCorrect(null)}
        ></IncorrectAnswer>
      );
    } else if (isCorrect === true) {
      return (
        <CorrectAnswer
          totalScore={totalScore}
          prevWord={prevWord}
          correctAnswer={correctAnswer}
          guess={guess}
          nextQuestion={() => setIsCorrect(null)}
        ></CorrectAnswer>
      );
    }
  };

  return loaded && <main>{render()}</main>;
};

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;

  label {
    text-align: center;
    margin-bottom: 0.8rem;
  }

  input {
    height: 4.8rem;
    padding-left: 0.8rem;
  }

  button {
    margin-top: 0.8rem;
    height: 4.8rem;
    text-transform: capitalize;
    cursor: pointer;
    background: #2e8540;
    border: none;
    color: #fff;
  }
`;

const StyledDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  h2 {
    font-size: 1.8rem;
  }

  span {
    margin-left: 0.8rem;
  }

  @media screen and (min-width: 768px) {
    h2 {
      font-size: 2.4rem;
    }
  }
`;

const StyledDivTwo = styled.div`
  p {
    text-align: center;
  }
`;

export default LearningRoute;
