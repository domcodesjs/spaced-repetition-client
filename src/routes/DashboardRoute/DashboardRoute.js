import { useEffect, useState } from 'react';
import config from '../../config';

const DashboardRoute = () => {
  const [language, setLanguage] = useState(null);
  const [words, setWords] = useState(null);

  useEffect(() => {
    const getLanguage = async () => {
      const token = localStorage.getItem('blogful-client-auth-token');

      const res = await fetch(`${config.API_ENDPOINT}/language`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token
        }
      });
      const data = await res.json();
      setLanguage(data.language);
      setWords(data.words);
    };
    getLanguage();
  }, []);

  return language && words ? (
    <section>
      <h2>{language.name}</h2>
      <p>Total correct answers: {language.total_score}</p>
      <a href='/learn'>Start practicing</a>
      <h3>Words to practice</h3>

      <main>
        <section>
          <ul>
            {words.map((word, idx) => (
              <li key={idx}>
                <h4>{word.original}</h4>
                <p>correct answer count: {word.correct_count}</p>
                <p>incorrect answer count: {word.incorrect_count}</p>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </section>
  ) : null;
};

export default DashboardRoute;
