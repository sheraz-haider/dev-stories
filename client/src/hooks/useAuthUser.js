import axios from 'axios';
import { useEffect } from 'react';
import { setAlert } from '../store/actions/alert';
import { loadUser } from '../store/actions/auth';
import { LOGOUT } from '../store/types';
import useStore from './useStore';

function useAuthUser() {
  const [
    {
      auth: { token },
    },
    dispatch,
  ] = useStore();

  const removeToken = () => {
    // remove token in header, local storage and logout
    delete axios.defaults.headers.common['x-access-token'];
    localStorage.removeItem('token');
    dispatch({ type: LOGOUT });
  };

  useEffect(() => {
    // Add a response interceptor
    axios.interceptors.response.use(
      res => res,
      err => {
        if (err.response.status === 401) {
          removeToken();

          const message = err.response.data.errors.token[0];
          dispatch(setAlert(message, 'danger'));
        }

        return Promise.reject(err);
      }
    );
  }, []);

  useEffect(() => {
    if (token) {
      // set token in header, local storage and get user
      axios.defaults.headers.common['x-access-token'] = token;
      localStorage.setItem('token', token);
      dispatch(loadUser());
    } else {
      removeToken();
    }
  }, [token]);
}

export default useAuthUser;
