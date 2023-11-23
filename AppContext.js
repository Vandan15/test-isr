'use client';

import { createContext, useReducer } from 'react';
import { TOKEN } from './common/constants';

const initialState = {
  authToken: '',
  showPrompt: false,
  user: null,
};

const reducer = (state, action) => {
  switch (action?.type) {
    case 'SET_CURRENT_USER':
      return { ...state, user: action?.data };
    case 'LOGOUT':
      localStorage?.removeItem(TOKEN);
      return { ...state, user: action?.data };
    default:
      return { ...state };
  }
};

const AppContext = createContext({
  state: initialState,
  dispatch: () => {},
});

function AppContextProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const initializeAuth = (authToken, userData) => {
    if (authToken) {
      localStorage?.setItem(TOKEN, authToken);
      dispatch({ type: 'SET_CURRENT_USER', data: userData });
    }
  };

  const value = {
    state,
    dispatch,
    initializeAuth,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

const AppContextConsumer = AppContext?.Consumer;

export { AppContext, AppContextConsumer, AppContextProvider };
