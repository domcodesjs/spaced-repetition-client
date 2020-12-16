import { useEffect, useState } from 'react';
import config from '../../config';

const LearningRoute = () => {
  const [nextWord, setNextWord] = useState(null);
  const [wordCorrectCount, setWordCorrectCount] = useState(null);
  const [wordIncorrectCount, setWordIncorrectCount] = useState(null);
  const [totalScore, setTotalScore] = useState(null);
  const [guess, setGuess] = useState(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const getHead = async () => {
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
    getHead();
  }, [nextWord, wordCorrectCount, wordIncorrectCount, totalScore, loaded]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(guess);
  };

  return loaded ? (
    <main>
      <div>
        <h2>Translate the word:</h2>
        <span>{nextWord}</span>
      </div>
      <p>Your total score is: {totalScore}</p>
      <p>You have answered this word correctly {wordCorrectCount} times.</p>
      <p>You have answered this word incorrectly {wordIncorrectCount} times.</p>

      <form onSubmit={handleSubmit}>
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
      </form>
    </main>
  ) : null;
};

export default LearningRoute;
