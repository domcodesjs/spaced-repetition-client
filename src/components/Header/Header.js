import { useContext } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import TokenService from '../../services/token-service';
import UserContext from '../../contexts/UserContext';

const Header = () => {
  const context = useContext(UserContext);

  const handleLogoutClick = () => {
    return context.processLogout();
  };

  const renderLogoutLink = () => {
    return (
      <div>
        <nav className='logged-in'>
          <span>{context.user.name}</span>
          <Link onClick={handleLogoutClick} to='/login'>
            Logout
          </Link>
        </nav>
      </div>
    );
  };

  const renderLoginLink = () => {
    return (
      <nav>
        <Link to='/login'>Login</Link> <Link to='/register'>Sign up</Link>
      </nav>
    );
  };

  return (
    <StyledHeader>
      <h1>
        <Link to='/'>Spaced repetition</Link>
      </h1>
      {TokenService.hasAuthToken() ? renderLogoutLink() : renderLoginLink()}
    </StyledHeader>
  );
};

const StyledHeader = styled.header`
  padding-bottom: 1.6rem;
  border-bottom: 1px solid black;

  a {
    text-decoration: none;
    text-transform: capitalize;
    color: inherit;
  }

  h1 {
    margin: 0;
    text-align: center;
  }

  nav {
    display: flex;
    justify-content: space-between;
    margin-top: 0.8rem;

    a {
      background-color: #3c3c3c;
      color: #fff;
      height: 3.2rem;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0.8rem;
      width: 49%;
    }
  }

  nav.logged-in {
    flex-direction: column;

    span {
      margin: 0 0 0.8rem 0;
      text-align: center;
    }

    a {
      width: 100%;
    }
  }
`;

export default Header;
