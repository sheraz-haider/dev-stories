import { Fragment, useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Landing from './components/layout/Landing';
import Navbar from './components/layout/Navbar';
import Alert from './components/layout/Alert';
import useAuthUser from './hooks/useAuthUser';
import PrivateRoute from './routing/PrivateRoute';
import Dashboard from './components/pages/Dashboard';
import CreateProfile from './components/pages/CreateProfile';
import EditProfile from './components/pages/EditProfile';
import useStore from './hooks/useStore';

function App() {
  // authenticate and load user info if token is present
  useAuthUser();

  const [
    {
      auth: { loadingUser },
    },
  ] = useStore();

  const [pauseRender, setPauseRender] = useState(loadingUser);

  useEffect(() => {
    setPauseRender(loadingUser);
  }, [loadingUser]);

  if (pauseRender) {
    // can show some sleek loading animation
    return null;
  }

  return (
    <Router>
      <Fragment>
        <Navbar />
        <Route path='/' exact component={Landing} />
        <section className='container'>
          <Alert />
          <Switch>
            <Route path='/login' exact component={Login} />
            <Route path='/register' exact component={Register} />
            <PrivateRoute path='/dashboard' exact component={Dashboard} />
            <PrivateRoute
              path='/create-profile'
              exact
              component={CreateProfile}
            />
            <PrivateRoute
              path='/edit-profile'
              exact
              component={EditProfile}
            />
          </Switch>
        </section>
      </Fragment>
    </Router>
  );
}

export default App;
