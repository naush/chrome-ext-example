import React from 'react';

import Local from './local';

const Context = React.createContext({});

function reducer(state: any, action: any) {
  const { payload } = action;
  const newState = {
    ...state,
    ...payload,
  };
  Local.save(newState);
  return newState;
}

type StoreProviderProps = {
  children: any,
};

const StoreProvider = ({ children }: StoreProviderProps) => {
  const [state, dispatch] = React.useReducer(reducer, Local.load());

  return (
    <Context.Provider
      value={{ state, dispatch }}
    >
      {children}
    </Context.Provider>
  );
};

export {
  StoreProvider,
  Context,
};
