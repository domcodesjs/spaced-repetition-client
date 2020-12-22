import styled from 'styled-components';
import RegistrationForm from '../../components/RegistrationForm/RegistrationForm';

const RegistrationRoute = () => {
  return (
    <StyledSection>
      <p>
        Practice learning a language with the spaced reptition revision
        technique.
      </p>
      <h2>Sign up</h2>
      <RegistrationForm />
    </StyledSection>
  );
};

const StyledSection = styled.section`
  h2 {
    text-align: center;
    text-transform: capitalize;
  }
`;

export default RegistrationRoute;
