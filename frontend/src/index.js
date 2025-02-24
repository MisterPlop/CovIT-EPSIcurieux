import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './style/app.css';
import './style/app-tablet.css';
import './style/app-laptop.css';
import { Provider } from "react-redux";
import { store, persistor } from "./store";
import { PersistGate } from 'redux-persist/integration/react';
import Loader from './Components/Loader';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
    <PersistGate loading={<Loader />} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
