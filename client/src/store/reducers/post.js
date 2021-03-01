import {
  ADD_COMMENT,
  ADD_POST,
  DELETE_POST,
  GET_POST,
  GET_POSTS,
  POSTS_ERROR,
  UPDATE_LIEKS,
} from '../types';

const initialState = {
  posts: [],
  post: null,
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_POSTS:
      return {
        ...state,
        posts: payload,
        loading: false,
      };

    case GET_POST:
      return {
        ...state,
        post: payload,
        loading: false,
      };

    case POSTS_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };

    case UPDATE_LIEKS:
      return {
        ...state,
        posts: state.posts.map(p =>
          p._id === payload.id ? { ...p, likes: payload.likes } : p
        ),
      };

    case ADD_POST:
      return {
        ...state,
        posts: [payload, ...state.posts],
      };

    case ADD_COMMENT:
      return {
        ...state,
        post: { ...state.post, comments: payload },
        loading: false,
      };

    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter(p => p._id !== payload),
      };

    default:
      return state;
  }
}
