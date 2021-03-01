import axios from 'axios';
import {
  ADD_POST,
  DELETE_POST,
  GET_POSTS,
  GET_POST,
  POSTS_ERROR,
  UPDATE_LIEKS,
  ADD_COMMENT,
} from '../types';
import { setAlert } from './alert';

export const getAllPosts = () => async dispatch => {
  try {
    const res = await axios('/api/posts');

    dispatch({
      type: GET_POSTS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: POSTS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const addLike = postId => async dispatch => {
  try {
    const res = await axios(`/api/posts/like/${postId}`, { method: 'PUT' });

    dispatch({
      type: UPDATE_LIEKS,
      payload: { id: postId, likes: res.data },
    });
  } catch (err) {
    dispatch({
      type: POSTS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const removeLike = postId => async dispatch => {
  try {
    const res = await axios(`/api/posts/unlike/${postId}`, { method: 'PUT' });

    dispatch({
      type: UPDATE_LIEKS,
      payload: { id: postId, likes: res.data },
    });
  } catch (err) {
    dispatch({
      type: POSTS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const addPost = formData => async dispatch => {
  try {
    const res = await axios(`/api/posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: formData,
    });

    dispatch({
      type: ADD_POST,
      payload: res.data,
    });

    dispatch(setAlert('New Post Added!', 'success'));
  } catch (err) {
    dispatch({
      type: POSTS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const deletePost = postId => async dispatch => {
  try {
    await axios(`/api/posts/${postId}`, {
      method: 'DELETE',
    });

    dispatch({
      type: DELETE_POST,
      payload: postId,
    });

    dispatch(setAlert('Post Deleted!', 'danger'));
  } catch (err) {
    dispatch({
      type: POSTS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const getSinglePost = postId => async dispatch => {
  try {
    const res = await axios(`/api/posts/${postId}`);

    dispatch({
      type: GET_POST,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: POSTS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const addComment = (postId, formData) => async dispatch => {
  try {
    const res = await axios(`/api/posts/comment/${postId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: formData,
    });

    dispatch({
      type: ADD_COMMENT,
      payload: res.data,
    });

    dispatch(setAlert('Comment Added!', 'success'));
  } catch (err) {
    dispatch({
      type: POSTS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
