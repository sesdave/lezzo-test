import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import ReactDOM from 'react-dom/client'
import App from './App';
import { StoreProvider } from './context/storeContext'; // Import your StoreProvider component

const root = ReactDOM.createRoot(
  document.getElementById('root')
)

root.render(
  <BrowserRouter>
    <StoreProvider>
      <App />
    </StoreProvider>
  </BrowserRouter>
);

