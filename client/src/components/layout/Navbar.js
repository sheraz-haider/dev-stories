import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import useStore from '../../hooks/useStore';
import { CLEAR_PROFILE, LOGOUT } from '../../store/types';

function Navbar() {
  const [
    {
      auth: { isLoggedIn },
    },
    dispatch,
  ] = useStore();

  const logoutUser = e => {
    e.preventDefault();
    dispatch({ type: CLEAR_PROFILE });
    dispatch({ type: LOGOUT });
  };

  const commonRoutes = (
    <Fragment>
      <li>
        <Link to='/profiles'>Developers</Link>
      </li>
      <li>
        <Link to='/posts'>Posts</Link>
      </li>
    </Fragment>
  );

  const loggedOutRoutes = (
    <ul>
      {commonRoutes}
      
      <li>
        <Link to='/register'>Register</Link>
      </li>
      <li>
        <Link to='/login'>Login</Link>
      </li>
    </ul>
  );

  const loggedInRoutes = (
    <ul>
      {commonRoutes}
      
      <li>
        <Link to='/dashboard'>Dashboard</Link>
      </li>
      <li>
        <a href='#' onClick={logoutUser}>
          Logout
        </a>
      </li>
    </ul>
  );

  return (
    <nav className='navbar bg-dark'>
      <h1>
        <Link to='/'>
          <i className='fas fa-code'></i> Dev Stories
        </Link>
      </h1>
      {isLoggedIn ? loggedInRoutes : loggedOutRoutes}
    </nav>
  );
}

export default Navbar;
