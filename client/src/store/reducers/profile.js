import { GET_PROFILE, CLEAR_PROFILE, PROFILE_ERROR } from '../types';

const initialState = {
  profile: null,
  profiles: [],
  repos: [],
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_PROFILE:
      return {
        ...state,
        loading: false,
        profile: payload,
      };

    case CLEAR_PROFILE:
      return {
        ...state,
        loading: false,
        repos: [],
        profile: null,
      };

    case PROFILE_ERROR:
      return {
        ...state,
        loading: false,
        error: payload,
      };

    default:
      return state;
  }
}
