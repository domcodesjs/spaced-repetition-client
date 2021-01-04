import { useRef, useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import AuthApiService from '../../services/auth-api-service';
import UserContext from '../../contexts/UserContext';

const LoginForm = () => {
  const [error, setError] = useState(null);
  const context = useContext(UserContext);
  const firstInput = useRef(null);
  let history = useHistory();

  useEffect(() => {
    firstInput.current.focus();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const { username, password } = e.target;

    setError(null);

    AuthApiService.postLogin({
      username: username.value,
      password: password.value
    })
      .then((res) => {
        username.value = '';
        password.value = '';
        context.processLogin(res.authToken);
        return history.push('/');
      })
      .catch((res) => {
        return setError(res.error);
      });
  };

  return (
    <StyledForm className='LoginStyledForm' onSubmit={handleSubmit}>
      <div role='alert'>{error && <p>{error}</p>}</div>
      <div>
        <label htmlFor='login-username-input'>Username</label>
        <input
          ref={firstInput}
          id='login-username-input'
          name='username'
          type='text'
          required
        />
      </div>
      <div>
        <label htmlFor='login-password-input'>Password</label>
        <input
          id='login-password-input'
          name='password'
          type='password'
          required
        />
      </div>
      <button type='submit'>Login</button>
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

  button {
    height: 4.8rem;
    width: 100%;
    cursor: pointer;
    background: #2e8540;
    color: #fff;
    border: none;
  }
`;

export default LoginForm;
