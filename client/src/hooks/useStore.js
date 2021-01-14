import { useEffect, useState } from 'react';
import store from '../store';

function useStore() {
  const [state, setState] = useState(store.getState());

  useEffect(() => {
    let unsubscribe = store.subscribe(() => {
      setState(store.getState());
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return [state, store.dispatch];
}

export default useStore;
