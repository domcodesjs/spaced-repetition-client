import React, { Component } from 'react';
import styled from 'styled-components';
import LoginForm from '../../components/LoginForm/LoginForm';

class LoginRoute extends Component {
  static defaultProps = {
    location: {},
    history: {
      push: () => {}
    }
  };

  handleLoginSuccess = () => {
    const { location, history } = this.props;
    const destination = (location.state || {}).from || '/';
    history.push(destination);
  };

  render() {
    return (
      <StyledSection>
        <h2>Login</h2>
        <LoginForm onLoginSuccess={this.handleLoginSuccess} />
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

export default LoginRoute;
