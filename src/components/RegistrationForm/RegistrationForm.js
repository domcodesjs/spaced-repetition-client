import { useEffect, useState, useRef, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import AuthApiService from '../../services/auth-api-service';
import UserContext from '../../contexts/UserContext';

const RegistrationForm = () => {
  const [error, setError] = useState(null);
  const firstInput = useRef(null);
  const context = useContext(UserContext);
  let history = useHistory();

  useEffect(() => {
    firstInput.current.focus();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, username, password } = e.target;

    try {
      await AuthApiService.postUser({
        name: name.value,
        username: username.value,
        password: password.value
      });
      const { authToken } = await AuthApiService.postLogin({
        username: username.value,
        password: password.value
      });

      name.value = '';
      username.value = '';
      password.value = '';

      context.processLogin(authToken);
      return history.push('/');
    } catch ({ error }) {
      return setError(error);
    }
  };

  return (
    <StyledForm onSubmit={handleSubmit}>
      <div role='alert'>{error && <p>{error}</p>}</div>
      <div>
        <label htmlFor='registration-name-input'>Enter your name*</label>
        <input
          ref={firstInput}
          id='registration-name-input'
          name='name'
          required
          type='text'
        />
      </div>
      <div>
        <label htmlFor='registration-username-input'>Choose a username*</label>
        <input
          id='registration-username-input'
          name='username'
          type='text'
          required
        />
      </div>
      <div>
        <label htmlFor='registration-password-input'>Choose a password*</label>
        <input
          id='registration-password-input'
          name='password'
          type='password'
          required
        />
      </div>
      <footer>
        <button type='submit'>Sign up</button>
        <Link to='/login'>Already have an account?</Link>
      </footer>
    </StyledForm>
  );
};

const StyledForm = styled.form`
  div {
    display: flex;
    flex-direction: column;
    margin-bottom: 0.8rem;

    label {
      margin-bottom: 0.4rem;
    }

    input {
      height: 4.8rem;
      padding-left: 0.8rem;
    }
  }

  footer {
    display: flex;
    flex-direction: column;

    button {
      height: 4.8rem;
      margin-bottom: 1.6rem;
      cursor: pointer;
      background: #3c3c3c;
      color: #fff;
      border: none;
      text-transform: capitalize;
    }

    a {
      text-align: center;
      color: inherit;
    }
  }
`;

export default RegistrationForm;
