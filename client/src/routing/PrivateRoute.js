import { Redirect, Route } from 'react-router-dom';
import useStore from '../hooks/useStore';
import PropTypes from 'prop-types';

function PrivateRoute({ component: Component, ...rest }) {
  const [
    {
      auth: { isLoggedIn, loadingUser },
    },
  ] = useStore();

  return (
    <Route
      {...rest}
      render={props =>
        !isLoggedIn && !loadingUser ? (
          <Redirect to='/login' />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
}

PrivateRoute.propTypes = {
  component: PropTypes.elementType,
};

export default PrivateRoute;
