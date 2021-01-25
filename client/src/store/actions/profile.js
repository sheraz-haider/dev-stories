import axios from 'axios';
import { GET_PROFILE, PROFILE_ERROR } from '../types';
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
      history.push('/dasboard');
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
