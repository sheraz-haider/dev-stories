import axios from 'axios';
import { useEffect } from 'react';
import { loadUser } from '../store/actions/auth';
import { LOGOUT } from '../store/types';
import useStore from './useStore';

function useAuthUser() {
  const [
    {
      auth: { token },
    },
    dispatch
  ] = useStore();

  useEffect(() => {
    if (token) {
      // set token in header, local storage and get user
      axios.defaults.headers.common['x-access-token'] = token;
      localStorage.setItem('token', token);
      dispatch(loadUser());
    } else {
      // remove token in header, local storage
      delete axios.defaults.headers.common['x-access-token'];
      localStorage.removeItem('token');
      dispatch({ type: LOGOUT });
    }
  }, [token]);
}

export default useAuthUser;
