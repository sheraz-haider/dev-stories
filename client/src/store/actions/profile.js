import axios from 'axios';
import {
  CLEAR_PROFILE,
  GET_PROFILE,
  GET_PROFILES,
  GET_REPOS,
  LOGOUT,
  PROFILE_ERROR,
  UPDATE_PROFILE,
} from '../types';
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

export const getProfiles = () => async dispatch => {
  dispatch({ type: CLEAR_PROFILE });

  try {
    const res = await axios('/api/profile');

    dispatch({
      type: GET_PROFILES,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const getProfileById = userId => async dispatch => {
  try {
    const res = await axios(`/api/profile/user/${userId}`);

    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const getRepos = username => async dispatch => {
  try {
    const res = await axios(`/api/profile/github/${username}`);

    dispatch({
      type: GET_REPOS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
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

export const delAccount = () => async dispatch => {
  try {
    await axios.delete('/api/profile/');

    dispatch({ type: LOGOUT });
    dispatch(setAlert('Your account permanently deleted', 'danger'));

    dispatch({ type: CLEAR_PROFILE });
  } catch (err) {
    const errors = err.response.data.errors;

    for (const errorName in errors) {
      dispatch(setAlert(errors[errorName][0], 'danger'));
    }
  }
};
