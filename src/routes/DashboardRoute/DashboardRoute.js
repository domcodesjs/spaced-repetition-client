import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
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
    <StyledSection>
      <h2>{language.name}</h2>
      <p>Total correct answers: {language.total_score}</p>
      <Link to='/learn'>Start practicing</Link>
      <h3>Words to practice</h3>

      <main>
        <StyledList>
          {words.map((word, idx) => (
            <li key={idx}>
              <h4>{word.original}</h4>
              <p>
                <span>correct answer count:</span> {word.correct_count}
              </p>
              <p>
                <span>incorrect answer count:</span> {word.incorrect_count}
              </p>
            </li>
          ))}
        </StyledList>
      </main>
    </StyledSection>
  ) : null;
};

const StyledSection = styled.section`
  text-align: center;

  h3 {
    text-transform: capitalize;
  }

  p {
    text-transform: capitalize;
    margin: 0;
  }

  a {
    background-color: #3c3c3c;
    color: #fff;
    height: 3.2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.8rem;
    text-decoration: none;
  }
`;

const StyledList = styled.ul`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-gap: 1.6rem;

  padding: 0;

  li {
    list-style: none;
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 0.01rem solid black;
    padding: 3.2rem 0;

    h4 {
      margin: 0 0 1.6rem 0;
    }
  }
`;

export default DashboardRoute;
