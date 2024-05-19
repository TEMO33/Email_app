import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { AuthContextProvider } from './contexts/AuthContextProvider.jsx';
import './App.css';

ReactDOM.createRoot(document.getElementById('root')).render(
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
);
