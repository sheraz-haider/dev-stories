import axios from 'axios';
import { useEffect, useState } from 'react';
import store from '../store';
import { loadUser } from '../store/actions/auth';
import { LOGOUT } from '../store/types';

function useAuthUser() {
  const [token, setToken] = useState(store.getState().auth.token);

  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      setToken(store.getState().auth.token);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (token) {
      // set token in header, local storage and get user
      axios.defaults.headers.common['x-access-token'] = token;

      localStorage.setItem('token', token);

      store.dispatch(loadUser());
    } else {
      // set token in header, local storage
      delete axios.defaults.headers.common['x-access-token'];
      localStorage.removeItem('token');
      store.dispatch({ type: LOGOUT });
    }
  }, [token]);
}

export default useAuthUser;
