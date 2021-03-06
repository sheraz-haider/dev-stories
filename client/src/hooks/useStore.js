import { useEffect, useState } from 'react';
import store from '../store';

function useStore() {
  const [state, setState] = useState(store.getState());

  function getCurrentState() {
    setState(store.getState());
  }

  useEffect(() => {
    let unsubscribe = store.subscribe(getCurrentState);
    getCurrentState();

    return () => unsubscribe();
  }, []);

  return [state, store.dispatch];
}

export default useStore;
