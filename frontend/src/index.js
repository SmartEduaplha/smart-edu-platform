import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // 👈 ده السطر السحري اللي كان ناقص أو مش شغال!
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);