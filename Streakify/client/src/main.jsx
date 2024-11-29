import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root')); 
//This ensures that React Router can handle the routes correctly across your app.

root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);