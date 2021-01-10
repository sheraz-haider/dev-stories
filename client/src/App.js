import { Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Landing from './components/layout/Landing';
import Navbar from './components/layout/Navbar';
// Redux
import { Provider } from 'react-redux';
import store from "./store";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Route path='/' exact component={Landing} />
          <section className='container'>
            <Switch>
              <Route path='/login' exact component={Login} />
              <Route path='/register' exact component={Register} />
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
}

export default App;
