import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './style/app.css';
import './style/app-tablet.css';
import './style/app-laptop.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
