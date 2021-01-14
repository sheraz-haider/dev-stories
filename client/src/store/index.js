import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const initialState = {};

const middlewares = [thunk];

const devtools =
  // eslint-disable-next-line no-undef
  process.env.NODE_ENV === 'production'
    ? applyMiddleware(...middlewares)
    : composeWithDevTools(applyMiddleware(...middlewares));

const store = createStore(rootReducer, initialState, devtools);

export default store;
