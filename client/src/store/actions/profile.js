import axios from 'axios';
import { GET_PROFILE, PROFILE_ERROR, UPDATE_PROFILE } from '../types';
import { setAlert } from './alert';

export const getCurrentProfile = () => async dispatch => {
  try {
    const res = await axios('/api/profile/me');

    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
    console.log(err);
  }
};

export const createProfile = (
  formData,
  history,
  edit = false
) => async dispatch => {
  try {
    const res = await axios('/api/profile', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: formData,
    });

    dispatch({ type: GET_PROFILE, payload: res.data });
    dispatch(setAlert(edit ? 'Profile Updated' : 'Profile Created', 'success'));

    if (!edit) {
      history.push('/dashboard');
    }
  } catch (err) {
    const errors = err.response.data.errors;

    for (const errorName in errors) {
      dispatch(setAlert(errors[errorName][0], 'danger'));
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });

    console.error(err);
  }
};

export const addExperience = (formData, history) => async dispatch => {
  try {
    const res = await axios('/api/profile/experience', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      data: formData,
    });

    dispatch({ type: UPDATE_PROFILE, payload: res.data });
    dispatch(setAlert('Experience Added', 'success'));

    history.push('/dashboard');
  } catch (err) {
    const errors = err.response.data.errors;

    for (const errorName in errors) {
      dispatch(setAlert(errors[errorName][0], 'danger'));
    }

    console.error(err);
  }
};

export const delExperience = id => async dispatch => {
  try {
    const res = await axios(`/api/profile/experience/${id}`, {
      method: 'DELETE',
    });

    dispatch({ type: UPDATE_PROFILE, payload: res.data });
  } catch (err) {
    const errors = err.response.data.errors;

    for (const errorName in errors) {
      dispatch(setAlert(errors[errorName][0], 'danger'));
    }
  }
};

export const addEducation = (formData, history) => async dispatch => {
  try {
    const res = await axios('/api/profile/education', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      data: formData,
    });

    dispatch({ type: UPDATE_PROFILE, payload: res.data });
    dispatch(setAlert('Education Added', 'success'));

    history.push('/dashboard');
  } catch (err) {
    const errors = err.response.data.errors;

    for (const errorName in errors) {
      dispatch(setAlert(errors[errorName][0], 'danger'));
    }
  }
};

export const delEducation = id => async dispatch => {
  try {
    const res = await axios(`/api/profile/education/${id}`, {
      method: 'DELETE',
    });

    dispatch({ type: UPDATE_PROFILE, payload: res.data });
  } catch (err) {
    const errors = err.response.data.errors;

    for (const errorName in errors) {
      dispatch(setAlert(errors[errorName][0], 'danger'));
    }
  }
};
