import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGOUT,
  AUTH_ERROR,
  LOGIN_FAIL,
  USER_LOADED,
  LOGIN_SUCCESS,
} from '../types';

const initialState = {
  token: localStorage.getItem('token'),
  user: null,
  isLoggedIn: false,
  loadingUser: true,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      return {
        ...state,
        token: payload.token,
        user: payload.user,
        isLoggedIn: true,
      };

    case USER_LOADED:
      return {
        ...state,
        user: payload,
        isLoggedIn: true,
        loadingUser: false,
      };

    case LOGOUT:
    case LOGIN_FAIL:
    case AUTH_ERROR:
    case REGISTER_FAIL:
      return {
        ...initialState,
        token: null,
        loadingUser: false,
      };

    default:
      return state;
  }
}
