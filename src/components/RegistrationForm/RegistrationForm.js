import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Input, Required, Label } from '../Form/Form';
import styled from 'styled-components';
import AuthApiService from '../../services/auth-api-service';
import Button from '../Button/Button';
import './RegistrationForm.css';

const RegistrationForm = (props) => {
  // static defaultProps = {
  //   onRegistrationSuccess: () => {}
  // };
  const [error, setError] = useState(null);
  const firstInput = useRef(null);

  useEffect(() => {
    firstInput.current.focus();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, username, password } = e.target;
    console.log(name.value, username.value, password.value);
    AuthApiService.postUser({
      name: name.value,
      username: username.value,
      password: password.value
    })
      .then((user) => {
        name.value = '';
        username.value = '';
        password.value = '';
        return props.onRegistrationSuccess();
      })
      .catch((res) => {
        return setError(res.error);
      });
  };

  return (
    <StyledForm onSubmit={handleSubmit}>
      <div role='alert'>{error && <p>{error}</p>}</div>
      <div>
        <Label htmlFor='registration-name-input'>
          Enter your name
          <Required />
        </Label>
        <Input
          ref={firstInput}
          id='registration-name-input'
          name='name'
          required
        />
      </div>
      <div>
        <Label htmlFor='registration-username-input'>
          Choose a username
          <Required />
        </Label>
        <Input id='registration-username-input' name='username' required />
      </div>
      <div>
        <Label htmlFor='registration-password-input'>
          Choose a password
          <Required />
        </Label>
        <Input
          id='registration-password-input'
          name='password'
          type='password'
          required
        />
      </div>
      <footer>
        <Button type='submit'>Sign up</Button>{' '}
        <Link to='/login'>Already have an account?</Link>
      </footer>
    </StyledForm>
  );
};

const StyledForm = styled.form`
  div {
    display: flex;
    flex-direction: column;
  }

  footer {
    display: flex;
    flex-direction: column;
  }
`;

export default RegistrationForm;
