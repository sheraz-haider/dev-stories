import axios from 'axios';
import { setAlert } from './alert';
import {
  AUTH_ERROR,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  USER_LOADED,
} from '../types';

export const register = (name, email, password) => async dispatch => {
  try {
    const res = await axios('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        name,
        email,
        password,
      },
    });

    dispatch({ type: REGISTER_SUCCESS, payload: res.data });
  } catch (err) {
    dispatch({ type: REGISTER_FAIL });

    const errors = err.response.data.errors;
    if (errors) {
      for (const errorName in errors) {
        dispatch(setAlert(errors[errorName][0], 'danger'));
      }
    } else {
      dispatch(
        setAlert(
          'Opps! Something went wrong. Please try again later.',
          'danger'
        )
      );
    }
  }
};

export const login = (email, password) => async dispatch => {
  try {
    const res = await axios('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        email,
        password,
      },
    });

    dispatch({ type: LOGIN_SUCCESS, payload: res.data });
  } catch (err) {
    dispatch({ type: LOGIN_FAIL });

    const errors = err.response.data.errors;
    if (errors) {
      for (const errorName in errors) {
        dispatch(setAlert(errors[errorName][0], 'danger'));
      }
    } else {
      dispatch(
        setAlert(
          'Opps! Something went wrong. Please try again later.',
          'danger'
        )
      );
    }
  }
};

export const loadUser = () => dispatch => {
  axios('/api/me')
    .then(res => {
      dispatch({ type: USER_LOADED, payload: res.data.user });
    })
    .catch(() => {
      dispatch({ type: AUTH_ERROR });
    });
};
