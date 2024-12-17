import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import WelcomePage from './Components/WelcomePage/WelcomePage';
import SignUpPage from './Components/SignUpPage/SignUpPage';
import LogInPage from './Components/LogInPage/LogInPage';
import Dashboard from './Components/Dashboard/Dashboard';

import './index.css';  // Ensure this file exists and doesn't interfere with Mantine styles
import ProtectedRoute from './Components/ProtectedRoute';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/Dashboard" element={<ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>} />
          <Route path="/" element={<WelcomePage/>} />
          <Route path="/SignUpPage" element={<SignUpPage />} />
          <Route path="/LogInPage" element={<LogInPage />} />
          
        </Routes>
      </BrowserRouter>
  </React.StrictMode>
);
