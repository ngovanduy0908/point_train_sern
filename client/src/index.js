import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthContextProvider } from './context/authContext';
import './index.css';
import globalReducer from './state/index.js';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
const root = ReactDOM.createRoot(document.getElementById('root'));

const store = configureStore({
  reducer: {
    global: globalReducer,
  },
});

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    </Provider>
  </React.StrictMode>
);
