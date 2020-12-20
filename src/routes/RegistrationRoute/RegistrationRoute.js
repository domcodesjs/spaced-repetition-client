import React, { Component } from 'react';
import styled from 'styled-components';
import RegistrationForm from '../../components/RegistrationForm/RegistrationForm';

class RegistrationRoute extends Component {
  static defaultProps = {
    history: {
      push: () => {}
    }
  };

  // handleRegistrationSuccess = () => {
  //   const { history } = this.props;
  //   return history.push('/login');
  // };

  render() {
    return (
      <StyledSection>
        <p>
          Practice learning a language with the spaced reptition revision
          technique.
        </p>
        <h2>Sign up</h2>
        <RegistrationForm
          onRegistrationSuccess={this.handleRegistrationSuccess}
        />
      </StyledSection>
    );
  }
}

const StyledSection = styled.section`
  h2 {
    text-align: center;
    text-transform: capitalize;
  }
`;

export default RegistrationRoute;
