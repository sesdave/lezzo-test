import React, { createContext, useContext } from 'react';
import { Provider } from 'react-redux';
import store from '../redux/store'; 
const StoreContext = createContext(null);
export const useStore = () => useContext(StoreContext);
export const StoreProvider = ({ children }) => (
  <StoreContext.Provider value={store}>
    <Provider store={store}>
      {children}
    </Provider>
  </StoreContext.Provider>
);
